
// Je déclare une fonction translateLatinCharacter qui prend en paramètre une string nommé latinCharacter
// Elle utilise le tableau associatif pour trouver la correspondance en morse du caractère donné
function translateLatinCharacter(latinCharacter) {
	const latinToMorse = {
		'A':'.-',
		'B':'-...',
		'C':'-.-.',
		'D':'-..',
		'E':'.',
		'F':'..-.',
		'G':'--.',
		'H':'....',
		'I':'..',
		'J':'.---',
		'K':'-.-',
		'L':'.-..',
		'M':'--',
		'N':'-.',
		'O':'---',
		'P':'.--.',
		'Q':'--.-',
		'R':'.-.',
		'S':'...',
		'T':'-',
		'U':'..-',
		'V':'...-',
		'W':'.--',
		'X':'-..-',
		'Y':'-.--',
		'Z':'--..'
	}

	return latinToMorse[latinCharacter]
}

translateLatinCharacter("K");