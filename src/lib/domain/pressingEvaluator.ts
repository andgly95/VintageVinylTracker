import type { Release, PressingQuality, LabelVariant } from './types';

/**
 * Evaluates the quality and collectibility of a vinyl pressing
 * based on label variant, matrix info, and other indicators.
 */

interface EvaluationInput {
	release: Release;
	notes?: string;
	formatDetails?: string[];
}

export function evaluatePressing(input: EvaluationInput): PressingQuality {
	const { release, notes = '', formatDetails = [] } = input;
	const notesLower = notes.toLowerCase();
	const formatsLower = formatDetails.map(f => f.toLowerCase());

	let score = 5;
	const qualityNotes: string[] = [];

	// Detect RVG stamp
	const hasRvgStamp =
		notesLower.includes('rvg') ||
		notesLower.includes('van gelder') ||
		notesLower.includes('rudy van gelder');
	if (hasRvgStamp) {
		score += 2;
		qualityNotes.push('Van Gelder mastering');
	}

	// Detect deep groove
	const hasDeepGroove =
		formatsLower.some(f => f.includes('deep groove')) ||
		notesLower.includes('deep groove') ||
		notesLower.includes('deep-groove');
	if (hasDeepGroove) {
		score += 1.5;
		qualityNotes.push('Deep groove pressing');
	}

	// Detect Plastylite ear mark (Blue Note specific)
	const hasEarMark =
		notesLower.includes('ear') && (notesLower.includes('plastylite') || notesLower.includes('plasty'));
	if (hasEarMark) {
		score += 1;
		qualityNotes.push('Plastylite ear mark');
	}

	// Extract and evaluate matrix suffix
	const matrixSuffix = extractMatrixSuffix(notesLower);
	if (matrixSuffix) {
		const matrixEval = evaluateMatrix(matrixSuffix);
		score += matrixEval.points;
		qualityNotes.push(matrixEval.note);
	}

	// Determine label variant
	const labelVariant = determineLabelVariant(release.label, release.catno, release.year);
	const labelEval = evaluateLabelVariant(labelVariant);
	score += labelEval.points;
	if (labelEval.note) {
		qualityNotes.push(labelEval.note);
	}

	// Check for first pressing indicators
	const isFirstPressing = checkFirstPressing(release, labelVariant, hasDeepGroove, matrixSuffix);
	if (isFirstPressing) {
		qualityNotes.push('First pressing indicators');
	}

	return {
		releaseId: release.id,
		hasRvgStamp,
		hasDeepGroove,
		hasEarMark,
		matrixSuffix,
		labelVariant,
		qualityScore: Math.min(10, Math.max(1, Math.round(score))),
		qualityNotes,
		isFirstPressing
	};
}

function extractMatrixSuffix(notes: string): string | undefined {
	// Common matrix patterns: 1A, A1, -1A, A-1, 1A/1B
	const patterns = [
		/matrix[:\s]+[^\s]*?([1-3][a-c])/i,
		/runout[:\s]+[^\s]*?([1-3][a-c])/i,
		/\b([1-3][a-c])\s*\/\s*([1-3][a-c])\b/i,
		/\b([a-c][1-3])\s*\/\s*([a-c][1-3])\b/i
	];

	for (const pattern of patterns) {
		const match = notes.match(pattern);
		if (match) {
			return match[1].toUpperCase();
		}
	}
	return undefined;
}

function evaluateMatrix(suffix: string): { points: number; note: string } {
	const upper = suffix.toUpperCase();

	// First cuts (1A, A1)
	if (/^1A$/i.test(upper) || /^A1$/i.test(upper) || /^-1A$/i.test(upper)) {
		return { points: 1.5, note: 'First matrix cut (1A)' };
	}

	// Early variants (1B, 1C, B1, C1)
	if (/^[1][A-C]$/i.test(upper) || /^[A-C]1$/i.test(upper)) {
		return { points: 1, note: 'Early matrix variant' };
	}

	// Later cuts
	if (/^[2-3][A-C]$/i.test(upper) || /^[A-C][2-3]$/i.test(upper)) {
		return { points: 0.5, note: 'Later matrix cut' };
	}

	return { points: 0, note: 'Matrix suffix present' };
}

export function determineLabelVariant(
	label: string,
	catno: string,
	year: number
): LabelVariant {
	const labelLower = label.toLowerCase();
	const catnoLower = catno.toLowerCase();

	// Blue Note
	if (labelLower.includes('blue note')) {
		if (year <= 1956) return 'blue_note_lexington';
		if (year <= 1966) return 'blue_note_ny_47';
		if (year <= 1970) return 'blue_note_ny_liberty';
		return 'blue_note_ua';
	}

	// Columbia
	if (labelLower.includes('columbia')) {
		if (year <= 1962) {
			// 6-eye era - check for stereo
			if (catnoLower.startsWith('cs')) return 'columbia_6eye_stereo';
			return 'columbia_6eye_mono';
		}
		return 'columbia_2eye';
	}

	// Prestige
	if (labelLower.includes('prestige')) {
		if (year <= 1958) return 'prestige_ny';
		if (year <= 1971) return 'prestige_nj';
		return 'prestige_fantasy';
	}

	// Impulse
	if (labelLower.includes('impulse')) {
		if (year <= 1968) return 'impulse_orange_black';
		return 'impulse_abc';
	}

	// Riverside
	if (labelLower.includes('riverside')) {
		if (year <= 1958) return 'riverside_blue';
		return 'riverside_black';
	}

	// Contemporary
	if (labelLower.includes('contemporary')) {
		return 'contemporary';
	}

	// Atlantic
	if (labelLower.includes('atlantic')) {
		return 'atlantic_red_black';
	}

	// Verve
	if (labelLower.includes('verve') || labelLower.includes('clef') || labelLower.includes('norgran')) {
		if (year <= 1960) return 'verve_clef';
		return 'verve_mgm';
	}

	return 'other';
}

function evaluateLabelVariant(variant: LabelVariant): { points: number; note: string } {
	const scores: Record<LabelVariant, { points: number; note: string }> = {
		blue_note_lexington: { points: 2, note: 'Lexington Ave pressing (rarest)' },
		blue_note_ny_47: { points: 1.5, note: '47 West 63rd NYC pressing' },
		blue_note_ny_liberty: { points: 0.5, note: 'Liberty era Blue Note' },
		blue_note_ua: { points: 0, note: 'UA era Blue Note' },
		columbia_6eye_mono: { points: 1.5, note: 'Columbia 6-eye mono' },
		columbia_6eye_stereo: { points: 1.5, note: 'Columbia 6-eye stereo' },
		columbia_2eye: { points: 0.5, note: 'Columbia 2-eye' },
		prestige_ny: { points: 1.5, note: 'Prestige NYC yellow label' },
		prestige_nj: { points: 1, note: 'Prestige NJ blue label' },
		prestige_fantasy: { points: 0, note: 'Fantasy era Prestige' },
		impulse_orange_black: { points: 1.5, note: 'Impulse orange/black label' },
		impulse_abc: { points: 0.5, note: 'ABC Impulse' },
		riverside_blue: { points: 1.5, note: 'Riverside blue label' },
		riverside_black: { points: 1, note: 'Riverside black label' },
		contemporary: { points: 1, note: 'Contemporary Records' },
		atlantic_red_black: { points: 1, note: 'Atlantic red/black label' },
		verve_clef: { points: 1.5, note: 'Verve/Clef trumpeter logo' },
		verve_mgm: { points: 0.5, note: 'MGM era Verve' },
		other: { points: 0, note: '' }
	};

	return scores[variant];
}

function checkFirstPressing(
	release: Release,
	variant: LabelVariant,
	hasDeepGroove: boolean,
	matrixSuffix?: string
): boolean {
	// First pressing indicators vary by label
	const firstPressingVariants: LabelVariant[] = [
		'blue_note_lexington',
		'blue_note_ny_47',
		'columbia_6eye_mono',
		'columbia_6eye_stereo',
		'prestige_ny',
		'impulse_orange_black',
		'riverside_blue',
		'verve_clef'
	];

	if (!firstPressingVariants.includes(variant)) {
		return false;
	}

	// Additional checks
	if (hasDeepGroove) return true;
	if (matrixSuffix && /^[1A]$/i.test(matrixSuffix)) return true;

	return true; // Early variant is likely first pressing
}

export function getQualityGrade(score: number): string {
	if (score >= 9) return 'Museum Grade';
	if (score >= 8) return 'Collector Grade';
	if (score >= 7) return 'Excellent';
	if (score >= 6) return 'Very Good';
	if (score >= 5) return 'Good';
	if (score >= 4) return 'Fair';
	return 'Common';
}

export function getLabelVariantDisplayName(variant: LabelVariant): string {
	const names: Record<LabelVariant, string> = {
		blue_note_lexington: 'Blue Note Lexington Ave',
		blue_note_ny_47: 'Blue Note 47 W 63rd NYC',
		blue_note_ny_liberty: 'Blue Note Liberty',
		blue_note_ua: 'Blue Note UA',
		columbia_6eye_mono: 'Columbia 6-Eye Mono',
		columbia_6eye_stereo: 'Columbia 6-Eye Stereo',
		columbia_2eye: 'Columbia 2-Eye',
		prestige_ny: 'Prestige NYC Yellow',
		prestige_nj: 'Prestige NJ Blue',
		prestige_fantasy: 'Prestige Fantasy',
		impulse_orange_black: 'Impulse Orange/Black',
		impulse_abc: 'ABC Impulse',
		riverside_blue: 'Riverside Blue',
		riverside_black: 'Riverside Black',
		contemporary: 'Contemporary',
		atlantic_red_black: 'Atlantic Red/Black',
		verve_clef: 'Verve/Clef',
		verve_mgm: 'Verve MGM',
		other: 'Other'
	};
	return names[variant];
}
