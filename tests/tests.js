(function(root) {
	'use strict';

	var noop = Function.prototype;

	var load = (typeof require == 'function' && !(root.define && define.amd)) ?
		require :
		(!root.document && root.java && root.load) || noop;

	var QUnit = (function() {
		return root.QUnit || (
			root.addEventListener || (root.addEventListener = noop),
			root.setTimeout || (root.setTimeout = noop),
			root.QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
			addEventListener === noop && delete root.addEventListener,
			root.QUnit
		);
	}());

	var qe = load('../node_modules/qunit-extras/qunit-extras.js');
	if (qe) {
		qe.runInContext(root);
	}

	/** The `he` object to test */
	var he = root.he || (root.he = (
		he = load('../he.js') || root.he,
		he = he.he || he
	));

	/*--------------------------------------------------------------------------*/

	function forEach(array, fn) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			fn(array[index]);
		}
	}

	function forOwn(object, fn) {
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				fn(key, object[key]);
			}
		}
	}

	var officialData = {'&AElig':{'codepoints':[198],'characters':'\xC6'},'&AElig;':{'codepoints':[198],'characters':'\xC6'},'&AMP':{'codepoints':[38],'characters':'&'},'&AMP;':{'codepoints':[38],'characters':'&'},'&Aacute':{'codepoints':[193],'characters':'\xC1'},'&Aacute;':{'codepoints':[193],'characters':'\xC1'},'&Abreve;':{'codepoints':[258],'characters':'\u0102'},'&Acirc':{'codepoints':[194],'characters':'\xC2'},'&Acirc;':{'codepoints':[194],'characters':'\xC2'},'&Acy;':{'codepoints':[1040],'characters':'\u0410'},'&Afr;':{'codepoints':[120068],'characters':'\uD835\uDD04'},'&Agrave':{'codepoints':[192],'characters':'\xC0'},'&Agrave;':{'codepoints':[192],'characters':'\xC0'},'&Alpha;':{'codepoints':[913],'characters':'\u0391'},'&Amacr;':{'codepoints':[256],'characters':'\u0100'},'&And;':{'codepoints':[10835],'characters':'\u2A53'},'&Aogon;':{'codepoints':[260],'characters':'\u0104'},'&Aopf;':{'codepoints':[120120],'characters':'\uD835\uDD38'},'&ApplyFunction;':{'codepoints':[8289],'characters':'\u2061'},'&Aring':{'codepoints':[197],'characters':'\xC5'},'&Aring;':{'codepoints':[197],'characters':'\xC5'},'&Ascr;':{'codepoints':[119964],'characters':'\uD835\uDC9C'},'&Assign;':{'codepoints':[8788],'characters':'\u2254'},'&Atilde':{'codepoints':[195],'characters':'\xC3'},'&Atilde;':{'codepoints':[195],'characters':'\xC3'},'&Auml':{'codepoints':[196],'characters':'\xC4'},'&Auml;':{'codepoints':[196],'characters':'\xC4'},'&Backslash;':{'codepoints':[8726],'characters':'\u2216'},'&Barv;':{'codepoints':[10983],'characters':'\u2AE7'},'&Barwed;':{'codepoints':[8966],'characters':'\u2306'},'&Bcy;':{'codepoints':[1041],'characters':'\u0411'},'&Because;':{'codepoints':[8757],'characters':'\u2235'},'&Bernoullis;':{'codepoints':[8492],'characters':'\u212C'},'&Beta;':{'codepoints':[914],'characters':'\u0392'},'&Bfr;':{'codepoints':[120069],'characters':'\uD835\uDD05'},'&Bopf;':{'codepoints':[120121],'characters':'\uD835\uDD39'},'&Breve;':{'codepoints':[728],'characters':'\u02D8'},'&Bscr;':{'codepoints':[8492],'characters':'\u212C'},'&Bumpeq;':{'codepoints':[8782],'characters':'\u224E'},'&CHcy;':{'codepoints':[1063],'characters':'\u0427'},'&COPY':{'codepoints':[169],'characters':'\xA9'},'&COPY;':{'codepoints':[169],'characters':'\xA9'},'&Cacute;':{'codepoints':[262],'characters':'\u0106'},'&Cap;':{'codepoints':[8914],'characters':'\u22D2'},'&CapitalDifferentialD;':{'codepoints':[8517],'characters':'\u2145'},'&Cayleys;':{'codepoints':[8493],'characters':'\u212D'},'&Ccaron;':{'codepoints':[268],'characters':'\u010C'},'&Ccedil':{'codepoints':[199],'characters':'\xC7'},'&Ccedil;':{'codepoints':[199],'characters':'\xC7'},'&Ccirc;':{'codepoints':[264],'characters':'\u0108'},'&Cconint;':{'codepoints':[8752],'characters':'\u2230'},'&Cdot;':{'codepoints':[266],'characters':'\u010A'},'&Cedilla;':{'codepoints':[184],'characters':'\xB8'},'&CenterDot;':{'codepoints':[183],'characters':'\xB7'},'&Cfr;':{'codepoints':[8493],'characters':'\u212D'},'&Chi;':{'codepoints':[935],'characters':'\u03A7'},'&CircleDot;':{'codepoints':[8857],'characters':'\u2299'},'&CircleMinus;':{'codepoints':[8854],'characters':'\u2296'},'&CirclePlus;':{'codepoints':[8853],'characters':'\u2295'},'&CircleTimes;':{'codepoints':[8855],'characters':'\u2297'},'&ClockwiseContourIntegral;':{'codepoints':[8754],'characters':'\u2232'},'&CloseCurlyDoubleQuote;':{'codepoints':[8221],'characters':'\u201D'},'&CloseCurlyQuote;':{'codepoints':[8217],'characters':'\u2019'},'&Colon;':{'codepoints':[8759],'characters':'\u2237'},'&Colone;':{'codepoints':[10868],'characters':'\u2A74'},'&Congruent;':{'codepoints':[8801],'characters':'\u2261'},'&Conint;':{'codepoints':[8751],'characters':'\u222F'},'&ContourIntegral;':{'codepoints':[8750],'characters':'\u222E'},'&Copf;':{'codepoints':[8450],'characters':'\u2102'},'&Coproduct;':{'codepoints':[8720],'characters':'\u2210'},'&CounterClockwiseContourIntegral;':{'codepoints':[8755],'characters':'\u2233'},'&Cross;':{'codepoints':[10799],'characters':'\u2A2F'},'&Cscr;':{'codepoints':[119966],'characters':'\uD835\uDC9E'},'&Cup;':{'codepoints':[8915],'characters':'\u22D3'},'&CupCap;':{'codepoints':[8781],'characters':'\u224D'},'&DD;':{'codepoints':[8517],'characters':'\u2145'},'&DDotrahd;':{'codepoints':[10513],'characters':'\u2911'},'&DJcy;':{'codepoints':[1026],'characters':'\u0402'},'&DScy;':{'codepoints':[1029],'characters':'\u0405'},'&DZcy;':{'codepoints':[1039],'characters':'\u040F'},'&Dagger;':{'codepoints':[8225],'characters':'\u2021'},'&Darr;':{'codepoints':[8609],'characters':'\u21A1'},'&Dashv;':{'codepoints':[10980],'characters':'\u2AE4'},'&Dcaron;':{'codepoints':[270],'characters':'\u010E'},'&Dcy;':{'codepoints':[1044],'characters':'\u0414'},'&Del;':{'codepoints':[8711],'characters':'\u2207'},'&Delta;':{'codepoints':[916],'characters':'\u0394'},'&Dfr;':{'codepoints':[120071],'characters':'\uD835\uDD07'},'&DiacriticalAcute;':{'codepoints':[180],'characters':'\xB4'},'&DiacriticalDot;':{'codepoints':[729],'characters':'\u02D9'},'&DiacriticalDoubleAcute;':{'codepoints':[733],'characters':'\u02DD'},'&DiacriticalGrave;':{'codepoints':[96],'characters':'`'},'&DiacriticalTilde;':{'codepoints':[732],'characters':'\u02DC'},'&Diamond;':{'codepoints':[8900],'characters':'\u22C4'},'&DifferentialD;':{'codepoints':[8518],'characters':'\u2146'},'&Dopf;':{'codepoints':[120123],'characters':'\uD835\uDD3B'},'&Dot;':{'codepoints':[168],'characters':'\xA8'},'&DotDot;':{'codepoints':[8412],'characters':'\u20DC'},'&DotEqual;':{'codepoints':[8784],'characters':'\u2250'},'&DoubleContourIntegral;':{'codepoints':[8751],'characters':'\u222F'},'&DoubleDot;':{'codepoints':[168],'characters':'\xA8'},'&DoubleDownArrow;':{'codepoints':[8659],'characters':'\u21D3'},'&DoubleLeftArrow;':{'codepoints':[8656],'characters':'\u21D0'},'&DoubleLeftRightArrow;':{'codepoints':[8660],'characters':'\u21D4'},'&DoubleLeftTee;':{'codepoints':[10980],'characters':'\u2AE4'},'&DoubleLongLeftArrow;':{'codepoints':[10232],'characters':'\u27F8'},'&DoubleLongLeftRightArrow;':{'codepoints':[10234],'characters':'\u27FA'},'&DoubleLongRightArrow;':{'codepoints':[10233],'characters':'\u27F9'},'&DoubleRightArrow;':{'codepoints':[8658],'characters':'\u21D2'},'&DoubleRightTee;':{'codepoints':[8872],'characters':'\u22A8'},'&DoubleUpArrow;':{'codepoints':[8657],'characters':'\u21D1'},'&DoubleUpDownArrow;':{'codepoints':[8661],'characters':'\u21D5'},'&DoubleVerticalBar;':{'codepoints':[8741],'characters':'\u2225'},'&DownArrow;':{'codepoints':[8595],'characters':'\u2193'},'&DownArrowBar;':{'codepoints':[10515],'characters':'\u2913'},'&DownArrowUpArrow;':{'codepoints':[8693],'characters':'\u21F5'},'&DownBreve;':{'codepoints':[785],'characters':'\u0311'},'&DownLeftRightVector;':{'codepoints':[10576],'characters':'\u2950'},'&DownLeftTeeVector;':{'codepoints':[10590],'characters':'\u295E'},'&DownLeftVector;':{'codepoints':[8637],'characters':'\u21BD'},'&DownLeftVectorBar;':{'codepoints':[10582],'characters':'\u2956'},'&DownRightTeeVector;':{'codepoints':[10591],'characters':'\u295F'},'&DownRightVector;':{'codepoints':[8641],'characters':'\u21C1'},'&DownRightVectorBar;':{'codepoints':[10583],'characters':'\u2957'},'&DownTee;':{'codepoints':[8868],'characters':'\u22A4'},'&DownTeeArrow;':{'codepoints':[8615],'characters':'\u21A7'},'&Downarrow;':{'codepoints':[8659],'characters':'\u21D3'},'&Dscr;':{'codepoints':[119967],'characters':'\uD835\uDC9F'},'&Dstrok;':{'codepoints':[272],'characters':'\u0110'},'&ENG;':{'codepoints':[330],'characters':'\u014A'},'&ETH':{'codepoints':[208],'characters':'\xD0'},'&ETH;':{'codepoints':[208],'characters':'\xD0'},'&Eacute':{'codepoints':[201],'characters':'\xC9'},'&Eacute;':{'codepoints':[201],'characters':'\xC9'},'&Ecaron;':{'codepoints':[282],'characters':'\u011A'},'&Ecirc':{'codepoints':[202],'characters':'\xCA'},'&Ecirc;':{'codepoints':[202],'characters':'\xCA'},'&Ecy;':{'codepoints':[1069],'characters':'\u042D'},'&Edot;':{'codepoints':[278],'characters':'\u0116'},'&Efr;':{'codepoints':[120072],'characters':'\uD835\uDD08'},'&Egrave':{'codepoints':[200],'characters':'\xC8'},'&Egrave;':{'codepoints':[200],'characters':'\xC8'},'&Element;':{'codepoints':[8712],'characters':'\u2208'},'&Emacr;':{'codepoints':[274],'characters':'\u0112'},'&EmptySmallSquare;':{'codepoints':[9723],'characters':'\u25FB'},'&EmptyVerySmallSquare;':{'codepoints':[9643],'characters':'\u25AB'},'&Eogon;':{'codepoints':[280],'characters':'\u0118'},'&Eopf;':{'codepoints':[120124],'characters':'\uD835\uDD3C'},'&Epsilon;':{'codepoints':[917],'characters':'\u0395'},'&Equal;':{'codepoints':[10869],'characters':'\u2A75'},'&EqualTilde;':{'codepoints':[8770],'characters':'\u2242'},'&Equilibrium;':{'codepoints':[8652],'characters':'\u21CC'},'&Escr;':{'codepoints':[8496],'characters':'\u2130'},'&Esim;':{'codepoints':[10867],'characters':'\u2A73'},'&Eta;':{'codepoints':[919],'characters':'\u0397'},'&Euml':{'codepoints':[203],'characters':'\xCB'},'&Euml;':{'codepoints':[203],'characters':'\xCB'},'&Exists;':{'codepoints':[8707],'characters':'\u2203'},'&ExponentialE;':{'codepoints':[8519],'characters':'\u2147'},'&Fcy;':{'codepoints':[1060],'characters':'\u0424'},'&Ffr;':{'codepoints':[120073],'characters':'\uD835\uDD09'},'&FilledSmallSquare;':{'codepoints':[9724],'characters':'\u25FC'},'&FilledVerySmallSquare;':{'codepoints':[9642],'characters':'\u25AA'},'&Fopf;':{'codepoints':[120125],'characters':'\uD835\uDD3D'},'&ForAll;':{'codepoints':[8704],'characters':'\u2200'},'&Fouriertrf;':{'codepoints':[8497],'characters':'\u2131'},'&Fscr;':{'codepoints':[8497],'characters':'\u2131'},'&GJcy;':{'codepoints':[1027],'characters':'\u0403'},'&GT':{'codepoints':[62],'characters':'>'},'&GT;':{'codepoints':[62],'characters':'>'},'&Gamma;':{'codepoints':[915],'characters':'\u0393'},'&Gammad;':{'codepoints':[988],'characters':'\u03DC'},'&Gbreve;':{'codepoints':[286],'characters':'\u011E'},'&Gcedil;':{'codepoints':[290],'characters':'\u0122'},'&Gcirc;':{'codepoints':[284],'characters':'\u011C'},'&Gcy;':{'codepoints':[1043],'characters':'\u0413'},'&Gdot;':{'codepoints':[288],'characters':'\u0120'},'&Gfr;':{'codepoints':[120074],'characters':'\uD835\uDD0A'},'&Gg;':{'codepoints':[8921],'characters':'\u22D9'},'&Gopf;':{'codepoints':[120126],'characters':'\uD835\uDD3E'},'&GreaterEqual;':{'codepoints':[8805],'characters':'\u2265'},'&GreaterEqualLess;':{'codepoints':[8923],'characters':'\u22DB'},'&GreaterFullEqual;':{'codepoints':[8807],'characters':'\u2267'},'&GreaterGreater;':{'codepoints':[10914],'characters':'\u2AA2'},'&GreaterLess;':{'codepoints':[8823],'characters':'\u2277'},'&GreaterSlantEqual;':{'codepoints':[10878],'characters':'\u2A7E'},'&GreaterTilde;':{'codepoints':[8819],'characters':'\u2273'},'&Gscr;':{'codepoints':[119970],'characters':'\uD835\uDCA2'},'&Gt;':{'codepoints':[8811],'characters':'\u226B'},'&HARDcy;':{'codepoints':[1066],'characters':'\u042A'},'&Hacek;':{'codepoints':[711],'characters':'\u02C7'},'&Hat;':{'codepoints':[94],'characters':'^'},'&Hcirc;':{'codepoints':[292],'characters':'\u0124'},'&Hfr;':{'codepoints':[8460],'characters':'\u210C'},'&HilbertSpace;':{'codepoints':[8459],'characters':'\u210B'},'&Hopf;':{'codepoints':[8461],'characters':'\u210D'},'&HorizontalLine;':{'codepoints':[9472],'characters':'\u2500'},'&Hscr;':{'codepoints':[8459],'characters':'\u210B'},'&Hstrok;':{'codepoints':[294],'characters':'\u0126'},'&HumpDownHump;':{'codepoints':[8782],'characters':'\u224E'},'&HumpEqual;':{'codepoints':[8783],'characters':'\u224F'},'&IEcy;':{'codepoints':[1045],'characters':'\u0415'},'&IJlig;':{'codepoints':[306],'characters':'\u0132'},'&IOcy;':{'codepoints':[1025],'characters':'\u0401'},'&Iacute':{'codepoints':[205],'characters':'\xCD'},'&Iacute;':{'codepoints':[205],'characters':'\xCD'},'&Icirc':{'codepoints':[206],'characters':'\xCE'},'&Icirc;':{'codepoints':[206],'characters':'\xCE'},'&Icy;':{'codepoints':[1048],'characters':'\u0418'},'&Idot;':{'codepoints':[304],'characters':'\u0130'},'&Ifr;':{'codepoints':[8465],'characters':'\u2111'},'&Igrave':{'codepoints':[204],'characters':'\xCC'},'&Igrave;':{'codepoints':[204],'characters':'\xCC'},'&Im;':{'codepoints':[8465],'characters':'\u2111'},'&Imacr;':{'codepoints':[298],'characters':'\u012A'},'&ImaginaryI;':{'codepoints':[8520],'characters':'\u2148'},'&Implies;':{'codepoints':[8658],'characters':'\u21D2'},'&Int;':{'codepoints':[8748],'characters':'\u222C'},'&Integral;':{'codepoints':[8747],'characters':'\u222B'},'&Intersection;':{'codepoints':[8898],'characters':'\u22C2'},'&InvisibleComma;':{'codepoints':[8291],'characters':'\u2063'},'&InvisibleTimes;':{'codepoints':[8290],'characters':'\u2062'},'&Iogon;':{'codepoints':[302],'characters':'\u012E'},'&Iopf;':{'codepoints':[120128],'characters':'\uD835\uDD40'},'&Iota;':{'codepoints':[921],'characters':'\u0399'},'&Iscr;':{'codepoints':[8464],'characters':'\u2110'},'&Itilde;':{'codepoints':[296],'characters':'\u0128'},'&Iukcy;':{'codepoints':[1030],'characters':'\u0406'},'&Iuml':{'codepoints':[207],'characters':'\xCF'},'&Iuml;':{'codepoints':[207],'characters':'\xCF'},'&Jcirc;':{'codepoints':[308],'characters':'\u0134'},'&Jcy;':{'codepoints':[1049],'characters':'\u0419'},'&Jfr;':{'codepoints':[120077],'characters':'\uD835\uDD0D'},'&Jopf;':{'codepoints':[120129],'characters':'\uD835\uDD41'},'&Jscr;':{'codepoints':[119973],'characters':'\uD835\uDCA5'},'&Jsercy;':{'codepoints':[1032],'characters':'\u0408'},'&Jukcy;':{'codepoints':[1028],'characters':'\u0404'},'&KHcy;':{'codepoints':[1061],'characters':'\u0425'},'&KJcy;':{'codepoints':[1036],'characters':'\u040C'},'&Kappa;':{'codepoints':[922],'characters':'\u039A'},'&Kcedil;':{'codepoints':[310],'characters':'\u0136'},'&Kcy;':{'codepoints':[1050],'characters':'\u041A'},'&Kfr;':{'codepoints':[120078],'characters':'\uD835\uDD0E'},'&Kopf;':{'codepoints':[120130],'characters':'\uD835\uDD42'},'&Kscr;':{'codepoints':[119974],'characters':'\uD835\uDCA6'},'&LJcy;':{'codepoints':[1033],'characters':'\u0409'},'&LT':{'codepoints':[60],'characters':'<'},'&LT;':{'codepoints':[60],'characters':'<'},'&Lacute;':{'codepoints':[313],'characters':'\u0139'},'&Lambda;':{'codepoints':[923],'characters':'\u039B'},'&Lang;':{'codepoints':[10218],'characters':'\u27EA'},'&Laplacetrf;':{'codepoints':[8466],'characters':'\u2112'},'&Larr;':{'codepoints':[8606],'characters':'\u219E'},'&Lcaron;':{'codepoints':[317],'characters':'\u013D'},'&Lcedil;':{'codepoints':[315],'characters':'\u013B'},'&Lcy;':{'codepoints':[1051],'characters':'\u041B'},'&LeftAngleBracket;':{'codepoints':[10216],'characters':'\u27E8'},'&LeftArrow;':{'codepoints':[8592],'characters':'\u2190'},'&LeftArrowBar;':{'codepoints':[8676],'characters':'\u21E4'},'&LeftArrowRightArrow;':{'codepoints':[8646],'characters':'\u21C6'},'&LeftCeiling;':{'codepoints':[8968],'characters':'\u2308'},'&LeftDoubleBracket;':{'codepoints':[10214],'characters':'\u27E6'},'&LeftDownTeeVector;':{'codepoints':[10593],'characters':'\u2961'},'&LeftDownVector;':{'codepoints':[8643],'characters':'\u21C3'},'&LeftDownVectorBar;':{'codepoints':[10585],'characters':'\u2959'},'&LeftFloor;':{'codepoints':[8970],'characters':'\u230A'},'&LeftRightArrow;':{'codepoints':[8596],'characters':'\u2194'},'&LeftRightVector;':{'codepoints':[10574],'characters':'\u294E'},'&LeftTee;':{'codepoints':[8867],'characters':'\u22A3'},'&LeftTeeArrow;':{'codepoints':[8612],'characters':'\u21A4'},'&LeftTeeVector;':{'codepoints':[10586],'characters':'\u295A'},'&LeftTriangle;':{'codepoints':[8882],'characters':'\u22B2'},'&LeftTriangleBar;':{'codepoints':[10703],'characters':'\u29CF'},'&LeftTriangleEqual;':{'codepoints':[8884],'characters':'\u22B4'},'&LeftUpDownVector;':{'codepoints':[10577],'characters':'\u2951'},'&LeftUpTeeVector;':{'codepoints':[10592],'characters':'\u2960'},'&LeftUpVector;':{'codepoints':[8639],'characters':'\u21BF'},'&LeftUpVectorBar;':{'codepoints':[10584],'characters':'\u2958'},'&LeftVector;':{'codepoints':[8636],'characters':'\u21BC'},'&LeftVectorBar;':{'codepoints':[10578],'characters':'\u2952'},'&Leftarrow;':{'codepoints':[8656],'characters':'\u21D0'},'&Leftrightarrow;':{'codepoints':[8660],'characters':'\u21D4'},'&LessEqualGreater;':{'codepoints':[8922],'characters':'\u22DA'},'&LessFullEqual;':{'codepoints':[8806],'characters':'\u2266'},'&LessGreater;':{'codepoints':[8822],'characters':'\u2276'},'&LessLess;':{'codepoints':[10913],'characters':'\u2AA1'},'&LessSlantEqual;':{'codepoints':[10877],'characters':'\u2A7D'},'&LessTilde;':{'codepoints':[8818],'characters':'\u2272'},'&Lfr;':{'codepoints':[120079],'characters':'\uD835\uDD0F'},'&Ll;':{'codepoints':[8920],'characters':'\u22D8'},'&Lleftarrow;':{'codepoints':[8666],'characters':'\u21DA'},'&Lmidot;':{'codepoints':[319],'characters':'\u013F'},'&LongLeftArrow;':{'codepoints':[10229],'characters':'\u27F5'},'&LongLeftRightArrow;':{'codepoints':[10231],'characters':'\u27F7'},'&LongRightArrow;':{'codepoints':[10230],'characters':'\u27F6'},'&Longleftarrow;':{'codepoints':[10232],'characters':'\u27F8'},'&Longleftrightarrow;':{'codepoints':[10234],'characters':'\u27FA'},'&Longrightarrow;':{'codepoints':[10233],'characters':'\u27F9'},'&Lopf;':{'codepoints':[120131],'characters':'\uD835\uDD43'},'&LowerLeftArrow;':{'codepoints':[8601],'characters':'\u2199'},'&LowerRightArrow;':{'codepoints':[8600],'characters':'\u2198'},'&Lscr;':{'codepoints':[8466],'characters':'\u2112'},'&Lsh;':{'codepoints':[8624],'characters':'\u21B0'},'&Lstrok;':{'codepoints':[321],'characters':'\u0141'},'&Lt;':{'codepoints':[8810],'characters':'\u226A'},'&Map;':{'codepoints':[10501],'characters':'\u2905'},'&Mcy;':{'codepoints':[1052],'characters':'\u041C'},'&MediumSpace;':{'codepoints':[8287],'characters':'\u205F'},'&Mellintrf;':{'codepoints':[8499],'characters':'\u2133'},'&Mfr;':{'codepoints':[120080],'characters':'\uD835\uDD10'},'&MinusPlus;':{'codepoints':[8723],'characters':'\u2213'},'&Mopf;':{'codepoints':[120132],'characters':'\uD835\uDD44'},'&Mscr;':{'codepoints':[8499],'characters':'\u2133'},'&Mu;':{'codepoints':[924],'characters':'\u039C'},'&NJcy;':{'codepoints':[1034],'characters':'\u040A'},'&Nacute;':{'codepoints':[323],'characters':'\u0143'},'&Ncaron;':{'codepoints':[327],'characters':'\u0147'},'&Ncedil;':{'codepoints':[325],'characters':'\u0145'},'&Ncy;':{'codepoints':[1053],'characters':'\u041D'},'&NegativeMediumSpace;':{'codepoints':[8203],'characters':'\u200B'},'&NegativeThickSpace;':{'codepoints':[8203],'characters':'\u200B'},'&NegativeThinSpace;':{'codepoints':[8203],'characters':'\u200B'},'&NegativeVeryThinSpace;':{'codepoints':[8203],'characters':'\u200B'},'&NestedGreaterGreater;':{'codepoints':[8811],'characters':'\u226B'},'&NestedLessLess;':{'codepoints':[8810],'characters':'\u226A'},'&NewLine;':{'codepoints':[10],'characters':'\n'},'&Nfr;':{'codepoints':[120081],'characters':'\uD835\uDD11'},'&NoBreak;':{'codepoints':[8288],'characters':'\u2060'},'&NonBreakingSpace;':{'codepoints':[160],'characters':'\xA0'},'&Nopf;':{'codepoints':[8469],'characters':'\u2115'},'&Not;':{'codepoints':[10988],'characters':'\u2AEC'},'&NotCongruent;':{'codepoints':[8802],'characters':'\u2262'},'&NotCupCap;':{'codepoints':[8813],'characters':'\u226D'},'&NotDoubleVerticalBar;':{'codepoints':[8742],'characters':'\u2226'},'&NotElement;':{'codepoints':[8713],'characters':'\u2209'},'&NotEqual;':{'codepoints':[8800],'characters':'\u2260'},'&NotEqualTilde;':{'codepoints':[8770,824],'characters':'\u2242\u0338'},'&NotExists;':{'codepoints':[8708],'characters':'\u2204'},'&NotGreater;':{'codepoints':[8815],'characters':'\u226F'},'&NotGreaterEqual;':{'codepoints':[8817],'characters':'\u2271'},'&NotGreaterFullEqual;':{'codepoints':[8807,824],'characters':'\u2267\u0338'},'&NotGreaterGreater;':{'codepoints':[8811,824],'characters':'\u226B\u0338'},'&NotGreaterLess;':{'codepoints':[8825],'characters':'\u2279'},'&NotGreaterSlantEqual;':{'codepoints':[10878,824],'characters':'\u2A7E\u0338'},'&NotGreaterTilde;':{'codepoints':[8821],'characters':'\u2275'},'&NotHumpDownHump;':{'codepoints':[8782,824],'characters':'\u224E\u0338'},'&NotHumpEqual;':{'codepoints':[8783,824],'characters':'\u224F\u0338'},'&NotLeftTriangle;':{'codepoints':[8938],'characters':'\u22EA'},'&NotLeftTriangleBar;':{'codepoints':[10703,824],'characters':'\u29CF\u0338'},'&NotLeftTriangleEqual;':{'codepoints':[8940],'characters':'\u22EC'},'&NotLess;':{'codepoints':[8814],'characters':'\u226E'},'&NotLessEqual;':{'codepoints':[8816],'characters':'\u2270'},'&NotLessGreater;':{'codepoints':[8824],'characters':'\u2278'},'&NotLessLess;':{'codepoints':[8810,824],'characters':'\u226A\u0338'},'&NotLessSlantEqual;':{'codepoints':[10877,824],'characters':'\u2A7D\u0338'},'&NotLessTilde;':{'codepoints':[8820],'characters':'\u2274'},'&NotNestedGreaterGreater;':{'codepoints':[10914,824],'characters':'\u2AA2\u0338'},'&NotNestedLessLess;':{'codepoints':[10913,824],'characters':'\u2AA1\u0338'},'&NotPrecedes;':{'codepoints':[8832],'characters':'\u2280'},'&NotPrecedesEqual;':{'codepoints':[10927,824],'characters':'\u2AAF\u0338'},'&NotPrecedesSlantEqual;':{'codepoints':[8928],'characters':'\u22E0'},'&NotReverseElement;':{'codepoints':[8716],'characters':'\u220C'},'&NotRightTriangle;':{'codepoints':[8939],'characters':'\u22EB'},'&NotRightTriangleBar;':{'codepoints':[10704,824],'characters':'\u29D0\u0338'},'&NotRightTriangleEqual;':{'codepoints':[8941],'characters':'\u22ED'},'&NotSquareSubset;':{'codepoints':[8847,824],'characters':'\u228F\u0338'},'&NotSquareSubsetEqual;':{'codepoints':[8930],'characters':'\u22E2'},'&NotSquareSuperset;':{'codepoints':[8848,824],'characters':'\u2290\u0338'},'&NotSquareSupersetEqual;':{'codepoints':[8931],'characters':'\u22E3'},'&NotSubset;':{'codepoints':[8834,8402],'characters':'\u2282\u20D2'},'&NotSubsetEqual;':{'codepoints':[8840],'characters':'\u2288'},'&NotSucceeds;':{'codepoints':[8833],'characters':'\u2281'},'&NotSucceedsEqual;':{'codepoints':[10928,824],'characters':'\u2AB0\u0338'},'&NotSucceedsSlantEqual;':{'codepoints':[8929],'characters':'\u22E1'},'&NotSucceedsTilde;':{'codepoints':[8831,824],'characters':'\u227F\u0338'},'&NotSuperset;':{'codepoints':[8835,8402],'characters':'\u2283\u20D2'},'&NotSupersetEqual;':{'codepoints':[8841],'characters':'\u2289'},'&NotTilde;':{'codepoints':[8769],'characters':'\u2241'},'&NotTildeEqual;':{'codepoints':[8772],'characters':'\u2244'},'&NotTildeFullEqual;':{'codepoints':[8775],'characters':'\u2247'},'&NotTildeTilde;':{'codepoints':[8777],'characters':'\u2249'},'&NotVerticalBar;':{'codepoints':[8740],'characters':'\u2224'},'&Nscr;':{'codepoints':[119977],'characters':'\uD835\uDCA9'},'&Ntilde':{'codepoints':[209],'characters':'\xD1'},'&Ntilde;':{'codepoints':[209],'characters':'\xD1'},'&Nu;':{'codepoints':[925],'characters':'\u039D'},'&OElig;':{'codepoints':[338],'characters':'\u0152'},'&Oacute':{'codepoints':[211],'characters':'\xD3'},'&Oacute;':{'codepoints':[211],'characters':'\xD3'},'&Ocirc':{'codepoints':[212],'characters':'\xD4'},'&Ocirc;':{'codepoints':[212],'characters':'\xD4'},'&Ocy;':{'codepoints':[1054],'characters':'\u041E'},'&Odblac;':{'codepoints':[336],'characters':'\u0150'},'&Ofr;':{'codepoints':[120082],'characters':'\uD835\uDD12'},'&Ograve':{'codepoints':[210],'characters':'\xD2'},'&Ograve;':{'codepoints':[210],'characters':'\xD2'},'&Omacr;':{'codepoints':[332],'characters':'\u014C'},'&Omega;':{'codepoints':[937],'characters':'\u03A9'},'&Omicron;':{'codepoints':[927],'characters':'\u039F'},'&Oopf;':{'codepoints':[120134],'characters':'\uD835\uDD46'},'&OpenCurlyDoubleQuote;':{'codepoints':[8220],'characters':'\u201C'},'&OpenCurlyQuote;':{'codepoints':[8216],'characters':'\u2018'},'&Or;':{'codepoints':[10836],'characters':'\u2A54'},'&Oscr;':{'codepoints':[119978],'characters':'\uD835\uDCAA'},'&Oslash':{'codepoints':[216],'characters':'\xD8'},'&Oslash;':{'codepoints':[216],'characters':'\xD8'},'&Otilde':{'codepoints':[213],'characters':'\xD5'},'&Otilde;':{'codepoints':[213],'characters':'\xD5'},'&Otimes;':{'codepoints':[10807],'characters':'\u2A37'},'&Ouml':{'codepoints':[214],'characters':'\xD6'},'&Ouml;':{'codepoints':[214],'characters':'\xD6'},'&OverBar;':{'codepoints':[8254],'characters':'\u203E'},'&OverBrace;':{'codepoints':[9182],'characters':'\u23DE'},'&OverBracket;':{'codepoints':[9140],'characters':'\u23B4'},'&OverParenthesis;':{'codepoints':[9180],'characters':'\u23DC'},'&PartialD;':{'codepoints':[8706],'characters':'\u2202'},'&Pcy;':{'codepoints':[1055],'characters':'\u041F'},'&Pfr;':{'codepoints':[120083],'characters':'\uD835\uDD13'},'&Phi;':{'codepoints':[934],'characters':'\u03A6'},'&Pi;':{'codepoints':[928],'characters':'\u03A0'},'&PlusMinus;':{'codepoints':[177],'characters':'\xB1'},'&Poincareplane;':{'codepoints':[8460],'characters':'\u210C'},'&Popf;':{'codepoints':[8473],'characters':'\u2119'},'&Pr;':{'codepoints':[10939],'characters':'\u2ABB'},'&Precedes;':{'codepoints':[8826],'characters':'\u227A'},'&PrecedesEqual;':{'codepoints':[10927],'characters':'\u2AAF'},'&PrecedesSlantEqual;':{'codepoints':[8828],'characters':'\u227C'},'&PrecedesTilde;':{'codepoints':[8830],'characters':'\u227E'},'&Prime;':{'codepoints':[8243],'characters':'\u2033'},'&Product;':{'codepoints':[8719],'characters':'\u220F'},'&Proportion;':{'codepoints':[8759],'characters':'\u2237'},'&Proportional;':{'codepoints':[8733],'characters':'\u221D'},'&Pscr;':{'codepoints':[119979],'characters':'\uD835\uDCAB'},'&Psi;':{'codepoints':[936],'characters':'\u03A8'},'&QUOT':{'codepoints':[34],'characters':'"'},'&QUOT;':{'codepoints':[34],'characters':'"'},'&Qfr;':{'codepoints':[120084],'characters':'\uD835\uDD14'},'&Qopf;':{'codepoints':[8474],'characters':'\u211A'},'&Qscr;':{'codepoints':[119980],'characters':'\uD835\uDCAC'},'&RBarr;':{'codepoints':[10512],'characters':'\u2910'},'&REG':{'codepoints':[174],'characters':'\xAE'},'&REG;':{'codepoints':[174],'characters':'\xAE'},'&Racute;':{'codepoints':[340],'characters':'\u0154'},'&Rang;':{'codepoints':[10219],'characters':'\u27EB'},'&Rarr;':{'codepoints':[8608],'characters':'\u21A0'},'&Rarrtl;':{'codepoints':[10518],'characters':'\u2916'},'&Rcaron;':{'codepoints':[344],'characters':'\u0158'},'&Rcedil;':{'codepoints':[342],'characters':'\u0156'},'&Rcy;':{'codepoints':[1056],'characters':'\u0420'},'&Re;':{'codepoints':[8476],'characters':'\u211C'},'&ReverseElement;':{'codepoints':[8715],'characters':'\u220B'},'&ReverseEquilibrium;':{'codepoints':[8651],'characters':'\u21CB'},'&ReverseUpEquilibrium;':{'codepoints':[10607],'characters':'\u296F'},'&Rfr;':{'codepoints':[8476],'characters':'\u211C'},'&Rho;':{'codepoints':[929],'characters':'\u03A1'},'&RightAngleBracket;':{'codepoints':[10217],'characters':'\u27E9'},'&RightArrow;':{'codepoints':[8594],'characters':'\u2192'},'&RightArrowBar;':{'codepoints':[8677],'characters':'\u21E5'},'&RightArrowLeftArrow;':{'codepoints':[8644],'characters':'\u21C4'},'&RightCeiling;':{'codepoints':[8969],'characters':'\u2309'},'&RightDoubleBracket;':{'codepoints':[10215],'characters':'\u27E7'},'&RightDownTeeVector;':{'codepoints':[10589],'characters':'\u295D'},'&RightDownVector;':{'codepoints':[8642],'characters':'\u21C2'},'&RightDownVectorBar;':{'codepoints':[10581],'characters':'\u2955'},'&RightFloor;':{'codepoints':[8971],'characters':'\u230B'},'&RightTee;':{'codepoints':[8866],'characters':'\u22A2'},'&RightTeeArrow;':{'codepoints':[8614],'characters':'\u21A6'},'&RightTeeVector;':{'codepoints':[10587],'characters':'\u295B'},'&RightTriangle;':{'codepoints':[8883],'characters':'\u22B3'},'&RightTriangleBar;':{'codepoints':[10704],'characters':'\u29D0'},'&RightTriangleEqual;':{'codepoints':[8885],'characters':'\u22B5'},'&RightUpDownVector;':{'codepoints':[10575],'characters':'\u294F'},'&RightUpTeeVector;':{'codepoints':[10588],'characters':'\u295C'},'&RightUpVector;':{'codepoints':[8638],'characters':'\u21BE'},'&RightUpVectorBar;':{'codepoints':[10580],'characters':'\u2954'},'&RightVector;':{'codepoints':[8640],'characters':'\u21C0'},'&RightVectorBar;':{'codepoints':[10579],'characters':'\u2953'},'&Rightarrow;':{'codepoints':[8658],'characters':'\u21D2'},'&Ropf;':{'codepoints':[8477],'characters':'\u211D'},'&RoundImplies;':{'codepoints':[10608],'characters':'\u2970'},'&Rrightarrow;':{'codepoints':[8667],'characters':'\u21DB'},'&Rscr;':{'codepoints':[8475],'characters':'\u211B'},'&Rsh;':{'codepoints':[8625],'characters':'\u21B1'},'&RuleDelayed;':{'codepoints':[10740],'characters':'\u29F4'},'&SHCHcy;':{'codepoints':[1065],'characters':'\u0429'},'&SHcy;':{'codepoints':[1064],'characters':'\u0428'},'&SOFTcy;':{'codepoints':[1068],'characters':'\u042C'},'&Sacute;':{'codepoints':[346],'characters':'\u015A'},'&Sc;':{'codepoints':[10940],'characters':'\u2ABC'},'&Scaron;':{'codepoints':[352],'characters':'\u0160'},'&Scedil;':{'codepoints':[350],'characters':'\u015E'},'&Scirc;':{'codepoints':[348],'characters':'\u015C'},'&Scy;':{'codepoints':[1057],'characters':'\u0421'},'&Sfr;':{'codepoints':[120086],'characters':'\uD835\uDD16'},'&ShortDownArrow;':{'codepoints':[8595],'characters':'\u2193'},'&ShortLeftArrow;':{'codepoints':[8592],'characters':'\u2190'},'&ShortRightArrow;':{'codepoints':[8594],'characters':'\u2192'},'&ShortUpArrow;':{'codepoints':[8593],'characters':'\u2191'},'&Sigma;':{'codepoints':[931],'characters':'\u03A3'},'&SmallCircle;':{'codepoints':[8728],'characters':'\u2218'},'&Sopf;':{'codepoints':[120138],'characters':'\uD835\uDD4A'},'&Sqrt;':{'codepoints':[8730],'characters':'\u221A'},'&Square;':{'codepoints':[9633],'characters':'\u25A1'},'&SquareIntersection;':{'codepoints':[8851],'characters':'\u2293'},'&SquareSubset;':{'codepoints':[8847],'characters':'\u228F'},'&SquareSubsetEqual;':{'codepoints':[8849],'characters':'\u2291'},'&SquareSuperset;':{'codepoints':[8848],'characters':'\u2290'},'&SquareSupersetEqual;':{'codepoints':[8850],'characters':'\u2292'},'&SquareUnion;':{'codepoints':[8852],'characters':'\u2294'},'&Sscr;':{'codepoints':[119982],'characters':'\uD835\uDCAE'},'&Star;':{'codepoints':[8902],'characters':'\u22C6'},'&Sub;':{'codepoints':[8912],'characters':'\u22D0'},'&Subset;':{'codepoints':[8912],'characters':'\u22D0'},'&SubsetEqual;':{'codepoints':[8838],'characters':'\u2286'},'&Succeeds;':{'codepoints':[8827],'characters':'\u227B'},'&SucceedsEqual;':{'codepoints':[10928],'characters':'\u2AB0'},'&SucceedsSlantEqual;':{'codepoints':[8829],'characters':'\u227D'},'&SucceedsTilde;':{'codepoints':[8831],'characters':'\u227F'},'&SuchThat;':{'codepoints':[8715],'characters':'\u220B'},'&Sum;':{'codepoints':[8721],'characters':'\u2211'},'&Sup;':{'codepoints':[8913],'characters':'\u22D1'},'&Superset;':{'codepoints':[8835],'characters':'\u2283'},'&SupersetEqual;':{'codepoints':[8839],'characters':'\u2287'},'&Supset;':{'codepoints':[8913],'characters':'\u22D1'},'&THORN':{'codepoints':[222],'characters':'\xDE'},'&THORN;':{'codepoints':[222],'characters':'\xDE'},'&TRADE;':{'codepoints':[8482],'characters':'\u2122'},'&TSHcy;':{'codepoints':[1035],'characters':'\u040B'},'&TScy;':{'codepoints':[1062],'characters':'\u0426'},'&Tab;':{'codepoints':[9],'characters':'\t'},'&Tau;':{'codepoints':[932],'characters':'\u03A4'},'&Tcaron;':{'codepoints':[356],'characters':'\u0164'},'&Tcedil;':{'codepoints':[354],'characters':'\u0162'},'&Tcy;':{'codepoints':[1058],'characters':'\u0422'},'&Tfr;':{'codepoints':[120087],'characters':'\uD835\uDD17'},'&Therefore;':{'codepoints':[8756],'characters':'\u2234'},'&Theta;':{'codepoints':[920],'characters':'\u0398'},'&ThickSpace;':{'codepoints':[8287,8202],'characters':'\u205F\u200A'},'&ThinSpace;':{'codepoints':[8201],'characters':'\u2009'},'&Tilde;':{'codepoints':[8764],'characters':'\u223C'},'&TildeEqual;':{'codepoints':[8771],'characters':'\u2243'},'&TildeFullEqual;':{'codepoints':[8773],'characters':'\u2245'},'&TildeTilde;':{'codepoints':[8776],'characters':'\u2248'},'&Topf;':{'codepoints':[120139],'characters':'\uD835\uDD4B'},'&TripleDot;':{'codepoints':[8411],'characters':'\u20DB'},'&Tscr;':{'codepoints':[119983],'characters':'\uD835\uDCAF'},'&Tstrok;':{'codepoints':[358],'characters':'\u0166'},'&Uacute':{'codepoints':[218],'characters':'\xDA'},'&Uacute;':{'codepoints':[218],'characters':'\xDA'},'&Uarr;':{'codepoints':[8607],'characters':'\u219F'},'&Uarrocir;':{'codepoints':[10569],'characters':'\u2949'},'&Ubrcy;':{'codepoints':[1038],'characters':'\u040E'},'&Ubreve;':{'codepoints':[364],'characters':'\u016C'},'&Ucirc':{'codepoints':[219],'characters':'\xDB'},'&Ucirc;':{'codepoints':[219],'characters':'\xDB'},'&Ucy;':{'codepoints':[1059],'characters':'\u0423'},'&Udblac;':{'codepoints':[368],'characters':'\u0170'},'&Ufr;':{'codepoints':[120088],'characters':'\uD835\uDD18'},'&Ugrave':{'codepoints':[217],'characters':'\xD9'},'&Ugrave;':{'codepoints':[217],'characters':'\xD9'},'&Umacr;':{'codepoints':[362],'characters':'\u016A'},'&UnderBar;':{'codepoints':[95],'characters':'_'},'&UnderBrace;':{'codepoints':[9183],'characters':'\u23DF'},'&UnderBracket;':{'codepoints':[9141],'characters':'\u23B5'},'&UnderParenthesis;':{'codepoints':[9181],'characters':'\u23DD'},'&Union;':{'codepoints':[8899],'characters':'\u22C3'},'&UnionPlus;':{'codepoints':[8846],'characters':'\u228E'},'&Uogon;':{'codepoints':[370],'characters':'\u0172'},'&Uopf;':{'codepoints':[120140],'characters':'\uD835\uDD4C'},'&UpArrow;':{'codepoints':[8593],'characters':'\u2191'},'&UpArrowBar;':{'codepoints':[10514],'characters':'\u2912'},'&UpArrowDownArrow;':{'codepoints':[8645],'characters':'\u21C5'},'&UpDownArrow;':{'codepoints':[8597],'characters':'\u2195'},'&UpEquilibrium;':{'codepoints':[10606],'characters':'\u296E'},'&UpTee;':{'codepoints':[8869],'characters':'\u22A5'},'&UpTeeArrow;':{'codepoints':[8613],'characters':'\u21A5'},'&Uparrow;':{'codepoints':[8657],'characters':'\u21D1'},'&Updownarrow;':{'codepoints':[8661],'characters':'\u21D5'},'&UpperLeftArrow;':{'codepoints':[8598],'characters':'\u2196'},'&UpperRightArrow;':{'codepoints':[8599],'characters':'\u2197'},'&Upsi;':{'codepoints':[978],'characters':'\u03D2'},'&Upsilon;':{'codepoints':[933],'characters':'\u03A5'},'&Uring;':{'codepoints':[366],'characters':'\u016E'},'&Uscr;':{'codepoints':[119984],'characters':'\uD835\uDCB0'},'&Utilde;':{'codepoints':[360],'characters':'\u0168'},'&Uuml':{'codepoints':[220],'characters':'\xDC'},'&Uuml;':{'codepoints':[220],'characters':'\xDC'},'&VDash;':{'codepoints':[8875],'characters':'\u22AB'},'&Vbar;':{'codepoints':[10987],'characters':'\u2AEB'},'&Vcy;':{'codepoints':[1042],'characters':'\u0412'},'&Vdash;':{'codepoints':[8873],'characters':'\u22A9'},'&Vdashl;':{'codepoints':[10982],'characters':'\u2AE6'},'&Vee;':{'codepoints':[8897],'characters':'\u22C1'},'&Verbar;':{'codepoints':[8214],'characters':'\u2016'},'&Vert;':{'codepoints':[8214],'characters':'\u2016'},'&VerticalBar;':{'codepoints':[8739],'characters':'\u2223'},'&VerticalLine;':{'codepoints':[124],'characters':'|'},'&VerticalSeparator;':{'codepoints':[10072],'characters':'\u2758'},'&VerticalTilde;':{'codepoints':[8768],'characters':'\u2240'},'&VeryThinSpace;':{'codepoints':[8202],'characters':'\u200A'},'&Vfr;':{'codepoints':[120089],'characters':'\uD835\uDD19'},'&Vopf;':{'codepoints':[120141],'characters':'\uD835\uDD4D'},'&Vscr;':{'codepoints':[119985],'characters':'\uD835\uDCB1'},'&Vvdash;':{'codepoints':[8874],'characters':'\u22AA'},'&Wcirc;':{'codepoints':[372],'characters':'\u0174'},'&Wedge;':{'codepoints':[8896],'characters':'\u22C0'},'&Wfr;':{'codepoints':[120090],'characters':'\uD835\uDD1A'},'&Wopf;':{'codepoints':[120142],'characters':'\uD835\uDD4E'},'&Wscr;':{'codepoints':[119986],'characters':'\uD835\uDCB2'},'&Xfr;':{'codepoints':[120091],'characters':'\uD835\uDD1B'},'&Xi;':{'codepoints':[926],'characters':'\u039E'},'&Xopf;':{'codepoints':[120143],'characters':'\uD835\uDD4F'},'&Xscr;':{'codepoints':[119987],'characters':'\uD835\uDCB3'},'&YAcy;':{'codepoints':[1071],'characters':'\u042F'},'&YIcy;':{'codepoints':[1031],'characters':'\u0407'},'&YUcy;':{'codepoints':[1070],'characters':'\u042E'},'&Yacute':{'codepoints':[221],'characters':'\xDD'},'&Yacute;':{'codepoints':[221],'characters':'\xDD'},'&Ycirc;':{'codepoints':[374],'characters':'\u0176'},'&Ycy;':{'codepoints':[1067],'characters':'\u042B'},'&Yfr;':{'codepoints':[120092],'characters':'\uD835\uDD1C'},'&Yopf;':{'codepoints':[120144],'characters':'\uD835\uDD50'},'&Yscr;':{'codepoints':[119988],'characters':'\uD835\uDCB4'},'&Yuml;':{'codepoints':[376],'characters':'\u0178'},'&ZHcy;':{'codepoints':[1046],'characters':'\u0416'},'&Zacute;':{'codepoints':[377],'characters':'\u0179'},'&Zcaron;':{'codepoints':[381],'characters':'\u017D'},'&Zcy;':{'codepoints':[1047],'characters':'\u0417'},'&Zdot;':{'codepoints':[379],'characters':'\u017B'},'&ZeroWidthSpace;':{'codepoints':[8203],'characters':'\u200B'},'&Zeta;':{'codepoints':[918],'characters':'\u0396'},'&Zfr;':{'codepoints':[8488],'characters':'\u2128'},'&Zopf;':{'codepoints':[8484],'characters':'\u2124'},'&Zscr;':{'codepoints':[119989],'characters':'\uD835\uDCB5'},'&aacute':{'codepoints':[225],'characters':'\xE1'},'&aacute;':{'codepoints':[225],'characters':'\xE1'},'&abreve;':{'codepoints':[259],'characters':'\u0103'},'&ac;':{'codepoints':[8766],'characters':'\u223E'},'&acE;':{'codepoints':[8766,819],'characters':'\u223E\u0333'},'&acd;':{'codepoints':[8767],'characters':'\u223F'},'&acirc':{'codepoints':[226],'characters':'\xE2'},'&acirc;':{'codepoints':[226],'characters':'\xE2'},'&acute':{'codepoints':[180],'characters':'\xB4'},'&acute;':{'codepoints':[180],'characters':'\xB4'},'&acy;':{'codepoints':[1072],'characters':'\u0430'},'&aelig':{'codepoints':[230],'characters':'\xE6'},'&aelig;':{'codepoints':[230],'characters':'\xE6'},'&af;':{'codepoints':[8289],'characters':'\u2061'},'&afr;':{'codepoints':[120094],'characters':'\uD835\uDD1E'},'&agrave':{'codepoints':[224],'characters':'\xE0'},'&agrave;':{'codepoints':[224],'characters':'\xE0'},'&alefsym;':{'codepoints':[8501],'characters':'\u2135'},'&aleph;':{'codepoints':[8501],'characters':'\u2135'},'&alpha;':{'codepoints':[945],'characters':'\u03B1'},'&amacr;':{'codepoints':[257],'characters':'\u0101'},'&amalg;':{'codepoints':[10815],'characters':'\u2A3F'},'&amp':{'codepoints':[38],'characters':'&'},'&amp;':{'codepoints':[38],'characters':'&'},'&and;':{'codepoints':[8743],'characters':'\u2227'},'&andand;':{'codepoints':[10837],'characters':'\u2A55'},'&andd;':{'codepoints':[10844],'characters':'\u2A5C'},'&andslope;':{'codepoints':[10840],'characters':'\u2A58'},'&andv;':{'codepoints':[10842],'characters':'\u2A5A'},'&ang;':{'codepoints':[8736],'characters':'\u2220'},'&ange;':{'codepoints':[10660],'characters':'\u29A4'},'&angle;':{'codepoints':[8736],'characters':'\u2220'},'&angmsd;':{'codepoints':[8737],'characters':'\u2221'},'&angmsdaa;':{'codepoints':[10664],'characters':'\u29A8'},'&angmsdab;':{'codepoints':[10665],'characters':'\u29A9'},'&angmsdac;':{'codepoints':[10666],'characters':'\u29AA'},'&angmsdad;':{'codepoints':[10667],'characters':'\u29AB'},'&angmsdae;':{'codepoints':[10668],'characters':'\u29AC'},'&angmsdaf;':{'codepoints':[10669],'characters':'\u29AD'},'&angmsdag;':{'codepoints':[10670],'characters':'\u29AE'},'&angmsdah;':{'codepoints':[10671],'characters':'\u29AF'},'&angrt;':{'codepoints':[8735],'characters':'\u221F'},'&angrtvb;':{'codepoints':[8894],'characters':'\u22BE'},'&angrtvbd;':{'codepoints':[10653],'characters':'\u299D'},'&angsph;':{'codepoints':[8738],'characters':'\u2222'},'&angst;':{'codepoints':[197],'characters':'\xC5'},'&angzarr;':{'codepoints':[9084],'characters':'\u237C'},'&aogon;':{'codepoints':[261],'characters':'\u0105'},'&aopf;':{'codepoints':[120146],'characters':'\uD835\uDD52'},'&ap;':{'codepoints':[8776],'characters':'\u2248'},'&apE;':{'codepoints':[10864],'characters':'\u2A70'},'&apacir;':{'codepoints':[10863],'characters':'\u2A6F'},'&ape;':{'codepoints':[8778],'characters':'\u224A'},'&apid;':{'codepoints':[8779],'characters':'\u224B'},'&apos;':{'codepoints':[39],'characters':'\''},'&approx;':{'codepoints':[8776],'characters':'\u2248'},'&approxeq;':{'codepoints':[8778],'characters':'\u224A'},'&aring':{'codepoints':[229],'characters':'\xE5'},'&aring;':{'codepoints':[229],'characters':'\xE5'},'&ascr;':{'codepoints':[119990],'characters':'\uD835\uDCB6'},'&ast;':{'codepoints':[42],'characters':'*'},'&asymp;':{'codepoints':[8776],'characters':'\u2248'},'&asympeq;':{'codepoints':[8781],'characters':'\u224D'},'&atilde':{'codepoints':[227],'characters':'\xE3'},'&atilde;':{'codepoints':[227],'characters':'\xE3'},'&auml':{'codepoints':[228],'characters':'\xE4'},'&auml;':{'codepoints':[228],'characters':'\xE4'},'&awconint;':{'codepoints':[8755],'characters':'\u2233'},'&awint;':{'codepoints':[10769],'characters':'\u2A11'},'&bNot;':{'codepoints':[10989],'characters':'\u2AED'},'&backcong;':{'codepoints':[8780],'characters':'\u224C'},'&backepsilon;':{'codepoints':[1014],'characters':'\u03F6'},'&backprime;':{'codepoints':[8245],'characters':'\u2035'},'&backsim;':{'codepoints':[8765],'characters':'\u223D'},'&backsimeq;':{'codepoints':[8909],'characters':'\u22CD'},'&barvee;':{'codepoints':[8893],'characters':'\u22BD'},'&barwed;':{'codepoints':[8965],'characters':'\u2305'},'&barwedge;':{'codepoints':[8965],'characters':'\u2305'},'&bbrk;':{'codepoints':[9141],'characters':'\u23B5'},'&bbrktbrk;':{'codepoints':[9142],'characters':'\u23B6'},'&bcong;':{'codepoints':[8780],'characters':'\u224C'},'&bcy;':{'codepoints':[1073],'characters':'\u0431'},'&bdquo;':{'codepoints':[8222],'characters':'\u201E'},'&becaus;':{'codepoints':[8757],'characters':'\u2235'},'&because;':{'codepoints':[8757],'characters':'\u2235'},'&bemptyv;':{'codepoints':[10672],'characters':'\u29B0'},'&bepsi;':{'codepoints':[1014],'characters':'\u03F6'},'&bernou;':{'codepoints':[8492],'characters':'\u212C'},'&beta;':{'codepoints':[946],'characters':'\u03B2'},'&beth;':{'codepoints':[8502],'characters':'\u2136'},'&between;':{'codepoints':[8812],'characters':'\u226C'},'&bfr;':{'codepoints':[120095],'characters':'\uD835\uDD1F'},'&bigcap;':{'codepoints':[8898],'characters':'\u22C2'},'&bigcirc;':{'codepoints':[9711],'characters':'\u25EF'},'&bigcup;':{'codepoints':[8899],'characters':'\u22C3'},'&bigodot;':{'codepoints':[10752],'characters':'\u2A00'},'&bigoplus;':{'codepoints':[10753],'characters':'\u2A01'},'&bigotimes;':{'codepoints':[10754],'characters':'\u2A02'},'&bigsqcup;':{'codepoints':[10758],'characters':'\u2A06'},'&bigstar;':{'codepoints':[9733],'characters':'\u2605'},'&bigtriangledown;':{'codepoints':[9661],'characters':'\u25BD'},'&bigtriangleup;':{'codepoints':[9651],'characters':'\u25B3'},'&biguplus;':{'codepoints':[10756],'characters':'\u2A04'},'&bigvee;':{'codepoints':[8897],'characters':'\u22C1'},'&bigwedge;':{'codepoints':[8896],'characters':'\u22C0'},'&bkarow;':{'codepoints':[10509],'characters':'\u290D'},'&blacklozenge;':{'codepoints':[10731],'characters':'\u29EB'},'&blacksquare;':{'codepoints':[9642],'characters':'\u25AA'},'&blacktriangle;':{'codepoints':[9652],'characters':'\u25B4'},'&blacktriangledown;':{'codepoints':[9662],'characters':'\u25BE'},'&blacktriangleleft;':{'codepoints':[9666],'characters':'\u25C2'},'&blacktriangleright;':{'codepoints':[9656],'characters':'\u25B8'},'&blank;':{'codepoints':[9251],'characters':'\u2423'},'&blk12;':{'codepoints':[9618],'characters':'\u2592'},'&blk14;':{'codepoints':[9617],'characters':'\u2591'},'&blk34;':{'codepoints':[9619],'characters':'\u2593'},'&block;':{'codepoints':[9608],'characters':'\u2588'},'&bne;':{'codepoints':[61,8421],'characters':'=\u20E5'},'&bnequiv;':{'codepoints':[8801,8421],'characters':'\u2261\u20E5'},'&bnot;':{'codepoints':[8976],'characters':'\u2310'},'&bopf;':{'codepoints':[120147],'characters':'\uD835\uDD53'},'&bot;':{'codepoints':[8869],'characters':'\u22A5'},'&bottom;':{'codepoints':[8869],'characters':'\u22A5'},'&bowtie;':{'codepoints':[8904],'characters':'\u22C8'},'&boxDL;':{'codepoints':[9559],'characters':'\u2557'},'&boxDR;':{'codepoints':[9556],'characters':'\u2554'},'&boxDl;':{'codepoints':[9558],'characters':'\u2556'},'&boxDr;':{'codepoints':[9555],'characters':'\u2553'},'&boxH;':{'codepoints':[9552],'characters':'\u2550'},'&boxHD;':{'codepoints':[9574],'characters':'\u2566'},'&boxHU;':{'codepoints':[9577],'characters':'\u2569'},'&boxHd;':{'codepoints':[9572],'characters':'\u2564'},'&boxHu;':{'codepoints':[9575],'characters':'\u2567'},'&boxUL;':{'codepoints':[9565],'characters':'\u255D'},'&boxUR;':{'codepoints':[9562],'characters':'\u255A'},'&boxUl;':{'codepoints':[9564],'characters':'\u255C'},'&boxUr;':{'codepoints':[9561],'characters':'\u2559'},'&boxV;':{'codepoints':[9553],'characters':'\u2551'},'&boxVH;':{'codepoints':[9580],'characters':'\u256C'},'&boxVL;':{'codepoints':[9571],'characters':'\u2563'},'&boxVR;':{'codepoints':[9568],'characters':'\u2560'},'&boxVh;':{'codepoints':[9579],'characters':'\u256B'},'&boxVl;':{'codepoints':[9570],'characters':'\u2562'},'&boxVr;':{'codepoints':[9567],'characters':'\u255F'},'&boxbox;':{'codepoints':[10697],'characters':'\u29C9'},'&boxdL;':{'codepoints':[9557],'characters':'\u2555'},'&boxdR;':{'codepoints':[9554],'characters':'\u2552'},'&boxdl;':{'codepoints':[9488],'characters':'\u2510'},'&boxdr;':{'codepoints':[9484],'characters':'\u250C'},'&boxh;':{'codepoints':[9472],'characters':'\u2500'},'&boxhD;':{'codepoints':[9573],'characters':'\u2565'},'&boxhU;':{'codepoints':[9576],'characters':'\u2568'},'&boxhd;':{'codepoints':[9516],'characters':'\u252C'},'&boxhu;':{'codepoints':[9524],'characters':'\u2534'},'&boxminus;':{'codepoints':[8863],'characters':'\u229F'},'&boxplus;':{'codepoints':[8862],'characters':'\u229E'},'&boxtimes;':{'codepoints':[8864],'characters':'\u22A0'},'&boxuL;':{'codepoints':[9563],'characters':'\u255B'},'&boxuR;':{'codepoints':[9560],'characters':'\u2558'},'&boxul;':{'codepoints':[9496],'characters':'\u2518'},'&boxur;':{'codepoints':[9492],'characters':'\u2514'},'&boxv;':{'codepoints':[9474],'characters':'\u2502'},'&boxvH;':{'codepoints':[9578],'characters':'\u256A'},'&boxvL;':{'codepoints':[9569],'characters':'\u2561'},'&boxvR;':{'codepoints':[9566],'characters':'\u255E'},'&boxvh;':{'codepoints':[9532],'characters':'\u253C'},'&boxvl;':{'codepoints':[9508],'characters':'\u2524'},'&boxvr;':{'codepoints':[9500],'characters':'\u251C'},'&bprime;':{'codepoints':[8245],'characters':'\u2035'},'&breve;':{'codepoints':[728],'characters':'\u02D8'},'&brvbar':{'codepoints':[166],'characters':'\xA6'},'&brvbar;':{'codepoints':[166],'characters':'\xA6'},'&bscr;':{'codepoints':[119991],'characters':'\uD835\uDCB7'},'&bsemi;':{'codepoints':[8271],'characters':'\u204F'},'&bsim;':{'codepoints':[8765],'characters':'\u223D'},'&bsime;':{'codepoints':[8909],'characters':'\u22CD'},'&bsol;':{'codepoints':[92],'characters':'\\'},'&bsolb;':{'codepoints':[10693],'characters':'\u29C5'},'&bsolhsub;':{'codepoints':[10184],'characters':'\u27C8'},'&bull;':{'codepoints':[8226],'characters':'\u2022'},'&bullet;':{'codepoints':[8226],'characters':'\u2022'},'&bump;':{'codepoints':[8782],'characters':'\u224E'},'&bumpE;':{'codepoints':[10926],'characters':'\u2AAE'},'&bumpe;':{'codepoints':[8783],'characters':'\u224F'},'&bumpeq;':{'codepoints':[8783],'characters':'\u224F'},'&cacute;':{'codepoints':[263],'characters':'\u0107'},'&cap;':{'codepoints':[8745],'characters':'\u2229'},'&capand;':{'codepoints':[10820],'characters':'\u2A44'},'&capbrcup;':{'codepoints':[10825],'characters':'\u2A49'},'&capcap;':{'codepoints':[10827],'characters':'\u2A4B'},'&capcup;':{'codepoints':[10823],'characters':'\u2A47'},'&capdot;':{'codepoints':[10816],'characters':'\u2A40'},'&caps;':{'codepoints':[8745,65024],'characters':'\u2229\uFE00'},'&caret;':{'codepoints':[8257],'characters':'\u2041'},'&caron;':{'codepoints':[711],'characters':'\u02C7'},'&ccaps;':{'codepoints':[10829],'characters':'\u2A4D'},'&ccaron;':{'codepoints':[269],'characters':'\u010D'},'&ccedil':{'codepoints':[231],'characters':'\xE7'},'&ccedil;':{'codepoints':[231],'characters':'\xE7'},'&ccirc;':{'codepoints':[265],'characters':'\u0109'},'&ccups;':{'codepoints':[10828],'characters':'\u2A4C'},'&ccupssm;':{'codepoints':[10832],'characters':'\u2A50'},'&cdot;':{'codepoints':[267],'characters':'\u010B'},'&cedil':{'codepoints':[184],'characters':'\xB8'},'&cedil;':{'codepoints':[184],'characters':'\xB8'},'&cemptyv;':{'codepoints':[10674],'characters':'\u29B2'},'&cent':{'codepoints':[162],'characters':'\xA2'},'&cent;':{'codepoints':[162],'characters':'\xA2'},'&centerdot;':{'codepoints':[183],'characters':'\xB7'},'&cfr;':{'codepoints':[120096],'characters':'\uD835\uDD20'},'&chcy;':{'codepoints':[1095],'characters':'\u0447'},'&check;':{'codepoints':[10003],'characters':'\u2713'},'&checkmark;':{'codepoints':[10003],'characters':'\u2713'},'&chi;':{'codepoints':[967],'characters':'\u03C7'},'&cir;':{'codepoints':[9675],'characters':'\u25CB'},'&cirE;':{'codepoints':[10691],'characters':'\u29C3'},'&circ;':{'codepoints':[710],'characters':'\u02C6'},'&circeq;':{'codepoints':[8791],'characters':'\u2257'},'&circlearrowleft;':{'codepoints':[8634],'characters':'\u21BA'},'&circlearrowright;':{'codepoints':[8635],'characters':'\u21BB'},'&circledR;':{'codepoints':[174],'characters':'\xAE'},'&circledS;':{'codepoints':[9416],'characters':'\u24C8'},'&circledast;':{'codepoints':[8859],'characters':'\u229B'},'&circledcirc;':{'codepoints':[8858],'characters':'\u229A'},'&circleddash;':{'codepoints':[8861],'characters':'\u229D'},'&cire;':{'codepoints':[8791],'characters':'\u2257'},'&cirfnint;':{'codepoints':[10768],'characters':'\u2A10'},'&cirmid;':{'codepoints':[10991],'characters':'\u2AEF'},'&cirscir;':{'codepoints':[10690],'characters':'\u29C2'},'&clubs;':{'codepoints':[9827],'characters':'\u2663'},'&clubsuit;':{'codepoints':[9827],'characters':'\u2663'},'&colon;':{'codepoints':[58],'characters':':'},'&colone;':{'codepoints':[8788],'characters':'\u2254'},'&coloneq;':{'codepoints':[8788],'characters':'\u2254'},'&comma;':{'codepoints':[44],'characters':','},'&commat;':{'codepoints':[64],'characters':'@'},'&comp;':{'codepoints':[8705],'characters':'\u2201'},'&compfn;':{'codepoints':[8728],'characters':'\u2218'},'&complement;':{'codepoints':[8705],'characters':'\u2201'},'&complexes;':{'codepoints':[8450],'characters':'\u2102'},'&cong;':{'codepoints':[8773],'characters':'\u2245'},'&congdot;':{'codepoints':[10861],'characters':'\u2A6D'},'&conint;':{'codepoints':[8750],'characters':'\u222E'},'&copf;':{'codepoints':[120148],'characters':'\uD835\uDD54'},'&coprod;':{'codepoints':[8720],'characters':'\u2210'},'&copy':{'codepoints':[169],'characters':'\xA9'},'&copy;':{'codepoints':[169],'characters':'\xA9'},'&copysr;':{'codepoints':[8471],'characters':'\u2117'},'&crarr;':{'codepoints':[8629],'characters':'\u21B5'},'&cross;':{'codepoints':[10007],'characters':'\u2717'},'&cscr;':{'codepoints':[119992],'characters':'\uD835\uDCB8'},'&csub;':{'codepoints':[10959],'characters':'\u2ACF'},'&csube;':{'codepoints':[10961],'characters':'\u2AD1'},'&csup;':{'codepoints':[10960],'characters':'\u2AD0'},'&csupe;':{'codepoints':[10962],'characters':'\u2AD2'},'&ctdot;':{'codepoints':[8943],'characters':'\u22EF'},'&cudarrl;':{'codepoints':[10552],'characters':'\u2938'},'&cudarrr;':{'codepoints':[10549],'characters':'\u2935'},'&cuepr;':{'codepoints':[8926],'characters':'\u22DE'},'&cuesc;':{'codepoints':[8927],'characters':'\u22DF'},'&cularr;':{'codepoints':[8630],'characters':'\u21B6'},'&cularrp;':{'codepoints':[10557],'characters':'\u293D'},'&cup;':{'codepoints':[8746],'characters':'\u222A'},'&cupbrcap;':{'codepoints':[10824],'characters':'\u2A48'},'&cupcap;':{'codepoints':[10822],'characters':'\u2A46'},'&cupcup;':{'codepoints':[10826],'characters':'\u2A4A'},'&cupdot;':{'codepoints':[8845],'characters':'\u228D'},'&cupor;':{'codepoints':[10821],'characters':'\u2A45'},'&cups;':{'codepoints':[8746,65024],'characters':'\u222A\uFE00'},'&curarr;':{'codepoints':[8631],'characters':'\u21B7'},'&curarrm;':{'codepoints':[10556],'characters':'\u293C'},'&curlyeqprec;':{'codepoints':[8926],'characters':'\u22DE'},'&curlyeqsucc;':{'codepoints':[8927],'characters':'\u22DF'},'&curlyvee;':{'codepoints':[8910],'characters':'\u22CE'},'&curlywedge;':{'codepoints':[8911],'characters':'\u22CF'},'&curren':{'codepoints':[164],'characters':'\xA4'},'&curren;':{'codepoints':[164],'characters':'\xA4'},'&curvearrowleft;':{'codepoints':[8630],'characters':'\u21B6'},'&curvearrowright;':{'codepoints':[8631],'characters':'\u21B7'},'&cuvee;':{'codepoints':[8910],'characters':'\u22CE'},'&cuwed;':{'codepoints':[8911],'characters':'\u22CF'},'&cwconint;':{'codepoints':[8754],'characters':'\u2232'},'&cwint;':{'codepoints':[8753],'characters':'\u2231'},'&cylcty;':{'codepoints':[9005],'characters':'\u232D'},'&dArr;':{'codepoints':[8659],'characters':'\u21D3'},'&dHar;':{'codepoints':[10597],'characters':'\u2965'},'&dagger;':{'codepoints':[8224],'characters':'\u2020'},'&daleth;':{'codepoints':[8504],'characters':'\u2138'},'&darr;':{'codepoints':[8595],'characters':'\u2193'},'&dash;':{'codepoints':[8208],'characters':'\u2010'},'&dashv;':{'codepoints':[8867],'characters':'\u22A3'},'&dbkarow;':{'codepoints':[10511],'characters':'\u290F'},'&dblac;':{'codepoints':[733],'characters':'\u02DD'},'&dcaron;':{'codepoints':[271],'characters':'\u010F'},'&dcy;':{'codepoints':[1076],'characters':'\u0434'},'&dd;':{'codepoints':[8518],'characters':'\u2146'},'&ddagger;':{'codepoints':[8225],'characters':'\u2021'},'&ddarr;':{'codepoints':[8650],'characters':'\u21CA'},'&ddotseq;':{'codepoints':[10871],'characters':'\u2A77'},'&deg':{'codepoints':[176],'characters':'\xB0'},'&deg;':{'codepoints':[176],'characters':'\xB0'},'&delta;':{'codepoints':[948],'characters':'\u03B4'},'&demptyv;':{'codepoints':[10673],'characters':'\u29B1'},'&dfisht;':{'codepoints':[10623],'characters':'\u297F'},'&dfr;':{'codepoints':[120097],'characters':'\uD835\uDD21'},'&dharl;':{'codepoints':[8643],'characters':'\u21C3'},'&dharr;':{'codepoints':[8642],'characters':'\u21C2'},'&diam;':{'codepoints':[8900],'characters':'\u22C4'},'&diamond;':{'codepoints':[8900],'characters':'\u22C4'},'&diamondsuit;':{'codepoints':[9830],'characters':'\u2666'},'&diams;':{'codepoints':[9830],'characters':'\u2666'},'&die;':{'codepoints':[168],'characters':'\xA8'},'&digamma;':{'codepoints':[989],'characters':'\u03DD'},'&disin;':{'codepoints':[8946],'characters':'\u22F2'},'&div;':{'codepoints':[247],'characters':'\xF7'},'&divide':{'codepoints':[247],'characters':'\xF7'},'&divide;':{'codepoints':[247],'characters':'\xF7'},'&divideontimes;':{'codepoints':[8903],'characters':'\u22C7'},'&divonx;':{'codepoints':[8903],'characters':'\u22C7'},'&djcy;':{'codepoints':[1106],'characters':'\u0452'},'&dlcorn;':{'codepoints':[8990],'characters':'\u231E'},'&dlcrop;':{'codepoints':[8973],'characters':'\u230D'},'&dollar;':{'codepoints':[36],'characters':'$'},'&dopf;':{'codepoints':[120149],'characters':'\uD835\uDD55'},'&dot;':{'codepoints':[729],'characters':'\u02D9'},'&doteq;':{'codepoints':[8784],'characters':'\u2250'},'&doteqdot;':{'codepoints':[8785],'characters':'\u2251'},'&dotminus;':{'codepoints':[8760],'characters':'\u2238'},'&dotplus;':{'codepoints':[8724],'characters':'\u2214'},'&dotsquare;':{'codepoints':[8865],'characters':'\u22A1'},'&doublebarwedge;':{'codepoints':[8966],'characters':'\u2306'},'&downarrow;':{'codepoints':[8595],'characters':'\u2193'},'&downdownarrows;':{'codepoints':[8650],'characters':'\u21CA'},'&downharpoonleft;':{'codepoints':[8643],'characters':'\u21C3'},'&downharpoonright;':{'codepoints':[8642],'characters':'\u21C2'},'&drbkarow;':{'codepoints':[10512],'characters':'\u2910'},'&drcorn;':{'codepoints':[8991],'characters':'\u231F'},'&drcrop;':{'codepoints':[8972],'characters':'\u230C'},'&dscr;':{'codepoints':[119993],'characters':'\uD835\uDCB9'},'&dscy;':{'codepoints':[1109],'characters':'\u0455'},'&dsol;':{'codepoints':[10742],'characters':'\u29F6'},'&dstrok;':{'codepoints':[273],'characters':'\u0111'},'&dtdot;':{'codepoints':[8945],'characters':'\u22F1'},'&dtri;':{'codepoints':[9663],'characters':'\u25BF'},'&dtrif;':{'codepoints':[9662],'characters':'\u25BE'},'&duarr;':{'codepoints':[8693],'characters':'\u21F5'},'&duhar;':{'codepoints':[10607],'characters':'\u296F'},'&dwangle;':{'codepoints':[10662],'characters':'\u29A6'},'&dzcy;':{'codepoints':[1119],'characters':'\u045F'},'&dzigrarr;':{'codepoints':[10239],'characters':'\u27FF'},'&eDDot;':{'codepoints':[10871],'characters':'\u2A77'},'&eDot;':{'codepoints':[8785],'characters':'\u2251'},'&eacute':{'codepoints':[233],'characters':'\xE9'},'&eacute;':{'codepoints':[233],'characters':'\xE9'},'&easter;':{'codepoints':[10862],'characters':'\u2A6E'},'&ecaron;':{'codepoints':[283],'characters':'\u011B'},'&ecir;':{'codepoints':[8790],'characters':'\u2256'},'&ecirc':{'codepoints':[234],'characters':'\xEA'},'&ecirc;':{'codepoints':[234],'characters':'\xEA'},'&ecolon;':{'codepoints':[8789],'characters':'\u2255'},'&ecy;':{'codepoints':[1101],'characters':'\u044D'},'&edot;':{'codepoints':[279],'characters':'\u0117'},'&ee;':{'codepoints':[8519],'characters':'\u2147'},'&efDot;':{'codepoints':[8786],'characters':'\u2252'},'&efr;':{'codepoints':[120098],'characters':'\uD835\uDD22'},'&eg;':{'codepoints':[10906],'characters':'\u2A9A'},'&egrave':{'codepoints':[232],'characters':'\xE8'},'&egrave;':{'codepoints':[232],'characters':'\xE8'},'&egs;':{'codepoints':[10902],'characters':'\u2A96'},'&egsdot;':{'codepoints':[10904],'characters':'\u2A98'},'&el;':{'codepoints':[10905],'characters':'\u2A99'},'&elinters;':{'codepoints':[9191],'characters':'\u23E7'},'&ell;':{'codepoints':[8467],'characters':'\u2113'},'&els;':{'codepoints':[10901],'characters':'\u2A95'},'&elsdot;':{'codepoints':[10903],'characters':'\u2A97'},'&emacr;':{'codepoints':[275],'characters':'\u0113'},'&empty;':{'codepoints':[8709],'characters':'\u2205'},'&emptyset;':{'codepoints':[8709],'characters':'\u2205'},'&emptyv;':{'codepoints':[8709],'characters':'\u2205'},'&emsp13;':{'codepoints':[8196],'characters':'\u2004'},'&emsp14;':{'codepoints':[8197],'characters':'\u2005'},'&emsp;':{'codepoints':[8195],'characters':'\u2003'},'&eng;':{'codepoints':[331],'characters':'\u014B'},'&ensp;':{'codepoints':[8194],'characters':'\u2002'},'&eogon;':{'codepoints':[281],'characters':'\u0119'},'&eopf;':{'codepoints':[120150],'characters':'\uD835\uDD56'},'&epar;':{'codepoints':[8917],'characters':'\u22D5'},'&eparsl;':{'codepoints':[10723],'characters':'\u29E3'},'&eplus;':{'codepoints':[10865],'characters':'\u2A71'},'&epsi;':{'codepoints':[949],'characters':'\u03B5'},'&epsilon;':{'codepoints':[949],'characters':'\u03B5'},'&epsiv;':{'codepoints':[1013],'characters':'\u03F5'},'&eqcirc;':{'codepoints':[8790],'characters':'\u2256'},'&eqcolon;':{'codepoints':[8789],'characters':'\u2255'},'&eqsim;':{'codepoints':[8770],'characters':'\u2242'},'&eqslantgtr;':{'codepoints':[10902],'characters':'\u2A96'},'&eqslantless;':{'codepoints':[10901],'characters':'\u2A95'},'&equals;':{'codepoints':[61],'characters':'='},'&equest;':{'codepoints':[8799],'characters':'\u225F'},'&equiv;':{'codepoints':[8801],'characters':'\u2261'},'&equivDD;':{'codepoints':[10872],'characters':'\u2A78'},'&eqvparsl;':{'codepoints':[10725],'characters':'\u29E5'},'&erDot;':{'codepoints':[8787],'characters':'\u2253'},'&erarr;':{'codepoints':[10609],'characters':'\u2971'},'&escr;':{'codepoints':[8495],'characters':'\u212F'},'&esdot;':{'codepoints':[8784],'characters':'\u2250'},'&esim;':{'codepoints':[8770],'characters':'\u2242'},'&eta;':{'codepoints':[951],'characters':'\u03B7'},'&eth':{'codepoints':[240],'characters':'\xF0'},'&eth;':{'codepoints':[240],'characters':'\xF0'},'&euml':{'codepoints':[235],'characters':'\xEB'},'&euml;':{'codepoints':[235],'characters':'\xEB'},'&euro;':{'codepoints':[8364],'characters':'\u20AC'},'&excl;':{'codepoints':[33],'characters':'!'},'&exist;':{'codepoints':[8707],'characters':'\u2203'},'&expectation;':{'codepoints':[8496],'characters':'\u2130'},'&exponentiale;':{'codepoints':[8519],'characters':'\u2147'},'&fallingdotseq;':{'codepoints':[8786],'characters':'\u2252'},'&fcy;':{'codepoints':[1092],'characters':'\u0444'},'&female;':{'codepoints':[9792],'characters':'\u2640'},'&ffilig;':{'codepoints':[64259],'characters':'\uFB03'},'&fflig;':{'codepoints':[64256],'characters':'\uFB00'},'&ffllig;':{'codepoints':[64260],'characters':'\uFB04'},'&ffr;':{'codepoints':[120099],'characters':'\uD835\uDD23'},'&filig;':{'codepoints':[64257],'characters':'\uFB01'},'&fjlig;':{'codepoints':[102,106],'characters':'fj'},'&flat;':{'codepoints':[9837],'characters':'\u266D'},'&fllig;':{'codepoints':[64258],'characters':'\uFB02'},'&fltns;':{'codepoints':[9649],'characters':'\u25B1'},'&fnof;':{'codepoints':[402],'characters':'\u0192'},'&fopf;':{'codepoints':[120151],'characters':'\uD835\uDD57'},'&forall;':{'codepoints':[8704],'characters':'\u2200'},'&fork;':{'codepoints':[8916],'characters':'\u22D4'},'&forkv;':{'codepoints':[10969],'characters':'\u2AD9'},'&fpartint;':{'codepoints':[10765],'characters':'\u2A0D'},'&frac12':{'codepoints':[189],'characters':'\xBD'},'&frac12;':{'codepoints':[189],'characters':'\xBD'},'&frac13;':{'codepoints':[8531],'characters':'\u2153'},'&frac14':{'codepoints':[188],'characters':'\xBC'},'&frac14;':{'codepoints':[188],'characters':'\xBC'},'&frac15;':{'codepoints':[8533],'characters':'\u2155'},'&frac16;':{'codepoints':[8537],'characters':'\u2159'},'&frac18;':{'codepoints':[8539],'characters':'\u215B'},'&frac23;':{'codepoints':[8532],'characters':'\u2154'},'&frac25;':{'codepoints':[8534],'characters':'\u2156'},'&frac34':{'codepoints':[190],'characters':'\xBE'},'&frac34;':{'codepoints':[190],'characters':'\xBE'},'&frac35;':{'codepoints':[8535],'characters':'\u2157'},'&frac38;':{'codepoints':[8540],'characters':'\u215C'},'&frac45;':{'codepoints':[8536],'characters':'\u2158'},'&frac56;':{'codepoints':[8538],'characters':'\u215A'},'&frac58;':{'codepoints':[8541],'characters':'\u215D'},'&frac78;':{'codepoints':[8542],'characters':'\u215E'},'&frasl;':{'codepoints':[8260],'characters':'\u2044'},'&frown;':{'codepoints':[8994],'characters':'\u2322'},'&fscr;':{'codepoints':[119995],'characters':'\uD835\uDCBB'},'&gE;':{'codepoints':[8807],'characters':'\u2267'},'&gEl;':{'codepoints':[10892],'characters':'\u2A8C'},'&gacute;':{'codepoints':[501],'characters':'\u01F5'},'&gamma;':{'codepoints':[947],'characters':'\u03B3'},'&gammad;':{'codepoints':[989],'characters':'\u03DD'},'&gap;':{'codepoints':[10886],'characters':'\u2A86'},'&gbreve;':{'codepoints':[287],'characters':'\u011F'},'&gcirc;':{'codepoints':[285],'characters':'\u011D'},'&gcy;':{'codepoints':[1075],'characters':'\u0433'},'&gdot;':{'codepoints':[289],'characters':'\u0121'},'&ge;':{'codepoints':[8805],'characters':'\u2265'},'&gel;':{'codepoints':[8923],'characters':'\u22DB'},'&geq;':{'codepoints':[8805],'characters':'\u2265'},'&geqq;':{'codepoints':[8807],'characters':'\u2267'},'&geqslant;':{'codepoints':[10878],'characters':'\u2A7E'},'&ges;':{'codepoints':[10878],'characters':'\u2A7E'},'&gescc;':{'codepoints':[10921],'characters':'\u2AA9'},'&gesdot;':{'codepoints':[10880],'characters':'\u2A80'},'&gesdoto;':{'codepoints':[10882],'characters':'\u2A82'},'&gesdotol;':{'codepoints':[10884],'characters':'\u2A84'},'&gesl;':{'codepoints':[8923,65024],'characters':'\u22DB\uFE00'},'&gesles;':{'codepoints':[10900],'characters':'\u2A94'},'&gfr;':{'codepoints':[120100],'characters':'\uD835\uDD24'},'&gg;':{'codepoints':[8811],'characters':'\u226B'},'&ggg;':{'codepoints':[8921],'characters':'\u22D9'},'&gimel;':{'codepoints':[8503],'characters':'\u2137'},'&gjcy;':{'codepoints':[1107],'characters':'\u0453'},'&gl;':{'codepoints':[8823],'characters':'\u2277'},'&glE;':{'codepoints':[10898],'characters':'\u2A92'},'&gla;':{'codepoints':[10917],'characters':'\u2AA5'},'&glj;':{'codepoints':[10916],'characters':'\u2AA4'},'&gnE;':{'codepoints':[8809],'characters':'\u2269'},'&gnap;':{'codepoints':[10890],'characters':'\u2A8A'},'&gnapprox;':{'codepoints':[10890],'characters':'\u2A8A'},'&gne;':{'codepoints':[10888],'characters':'\u2A88'},'&gneq;':{'codepoints':[10888],'characters':'\u2A88'},'&gneqq;':{'codepoints':[8809],'characters':'\u2269'},'&gnsim;':{'codepoints':[8935],'characters':'\u22E7'},'&gopf;':{'codepoints':[120152],'characters':'\uD835\uDD58'},'&grave;':{'codepoints':[96],'characters':'`'},'&gscr;':{'codepoints':[8458],'characters':'\u210A'},'&gsim;':{'codepoints':[8819],'characters':'\u2273'},'&gsime;':{'codepoints':[10894],'characters':'\u2A8E'},'&gsiml;':{'codepoints':[10896],'characters':'\u2A90'},'&gt':{'codepoints':[62],'characters':'>'},'&gt;':{'codepoints':[62],'characters':'>'},'&gtcc;':{'codepoints':[10919],'characters':'\u2AA7'},'&gtcir;':{'codepoints':[10874],'characters':'\u2A7A'},'&gtdot;':{'codepoints':[8919],'characters':'\u22D7'},'&gtlPar;':{'codepoints':[10645],'characters':'\u2995'},'&gtquest;':{'codepoints':[10876],'characters':'\u2A7C'},'&gtrapprox;':{'codepoints':[10886],'characters':'\u2A86'},'&gtrarr;':{'codepoints':[10616],'characters':'\u2978'},'&gtrdot;':{'codepoints':[8919],'characters':'\u22D7'},'&gtreqless;':{'codepoints':[8923],'characters':'\u22DB'},'&gtreqqless;':{'codepoints':[10892],'characters':'\u2A8C'},'&gtrless;':{'codepoints':[8823],'characters':'\u2277'},'&gtrsim;':{'codepoints':[8819],'characters':'\u2273'},'&gvertneqq;':{'codepoints':[8809,65024],'characters':'\u2269\uFE00'},'&gvnE;':{'codepoints':[8809,65024],'characters':'\u2269\uFE00'},'&hArr;':{'codepoints':[8660],'characters':'\u21D4'},'&hairsp;':{'codepoints':[8202],'characters':'\u200A'},'&half;':{'codepoints':[189],'characters':'\xBD'},'&hamilt;':{'codepoints':[8459],'characters':'\u210B'},'&hardcy;':{'codepoints':[1098],'characters':'\u044A'},'&harr;':{'codepoints':[8596],'characters':'\u2194'},'&harrcir;':{'codepoints':[10568],'characters':'\u2948'},'&harrw;':{'codepoints':[8621],'characters':'\u21AD'},'&hbar;':{'codepoints':[8463],'characters':'\u210F'},'&hcirc;':{'codepoints':[293],'characters':'\u0125'},'&hearts;':{'codepoints':[9829],'characters':'\u2665'},'&heartsuit;':{'codepoints':[9829],'characters':'\u2665'},'&hellip;':{'codepoints':[8230],'characters':'\u2026'},'&hercon;':{'codepoints':[8889],'characters':'\u22B9'},'&hfr;':{'codepoints':[120101],'characters':'\uD835\uDD25'},'&hksearow;':{'codepoints':[10533],'characters':'\u2925'},'&hkswarow;':{'codepoints':[10534],'characters':'\u2926'},'&hoarr;':{'codepoints':[8703],'characters':'\u21FF'},'&homtht;':{'codepoints':[8763],'characters':'\u223B'},'&hookleftarrow;':{'codepoints':[8617],'characters':'\u21A9'},'&hookrightarrow;':{'codepoints':[8618],'characters':'\u21AA'},'&hopf;':{'codepoints':[120153],'characters':'\uD835\uDD59'},'&horbar;':{'codepoints':[8213],'characters':'\u2015'},'&hscr;':{'codepoints':[119997],'characters':'\uD835\uDCBD'},'&hslash;':{'codepoints':[8463],'characters':'\u210F'},'&hstrok;':{'codepoints':[295],'characters':'\u0127'},'&hybull;':{'codepoints':[8259],'characters':'\u2043'},'&hyphen;':{'codepoints':[8208],'characters':'\u2010'},'&iacute':{'codepoints':[237],'characters':'\xED'},'&iacute;':{'codepoints':[237],'characters':'\xED'},'&ic;':{'codepoints':[8291],'characters':'\u2063'},'&icirc':{'codepoints':[238],'characters':'\xEE'},'&icirc;':{'codepoints':[238],'characters':'\xEE'},'&icy;':{'codepoints':[1080],'characters':'\u0438'},'&iecy;':{'codepoints':[1077],'characters':'\u0435'},'&iexcl':{'codepoints':[161],'characters':'\xA1'},'&iexcl;':{'codepoints':[161],'characters':'\xA1'},'&iff;':{'codepoints':[8660],'characters':'\u21D4'},'&ifr;':{'codepoints':[120102],'characters':'\uD835\uDD26'},'&igrave':{'codepoints':[236],'characters':'\xEC'},'&igrave;':{'codepoints':[236],'characters':'\xEC'},'&ii;':{'codepoints':[8520],'characters':'\u2148'},'&iiiint;':{'codepoints':[10764],'characters':'\u2A0C'},'&iiint;':{'codepoints':[8749],'characters':'\u222D'},'&iinfin;':{'codepoints':[10716],'characters':'\u29DC'},'&iiota;':{'codepoints':[8489],'characters':'\u2129'},'&ijlig;':{'codepoints':[307],'characters':'\u0133'},'&imacr;':{'codepoints':[299],'characters':'\u012B'},'&image;':{'codepoints':[8465],'characters':'\u2111'},'&imagline;':{'codepoints':[8464],'characters':'\u2110'},'&imagpart;':{'codepoints':[8465],'characters':'\u2111'},'&imath;':{'codepoints':[305],'characters':'\u0131'},'&imof;':{'codepoints':[8887],'characters':'\u22B7'},'&imped;':{'codepoints':[437],'characters':'\u01B5'},'&in;':{'codepoints':[8712],'characters':'\u2208'},'&incare;':{'codepoints':[8453],'characters':'\u2105'},'&infin;':{'codepoints':[8734],'characters':'\u221E'},'&infintie;':{'codepoints':[10717],'characters':'\u29DD'},'&inodot;':{'codepoints':[305],'characters':'\u0131'},'&int;':{'codepoints':[8747],'characters':'\u222B'},'&intcal;':{'codepoints':[8890],'characters':'\u22BA'},'&integers;':{'codepoints':[8484],'characters':'\u2124'},'&intercal;':{'codepoints':[8890],'characters':'\u22BA'},'&intlarhk;':{'codepoints':[10775],'characters':'\u2A17'},'&intprod;':{'codepoints':[10812],'characters':'\u2A3C'},'&iocy;':{'codepoints':[1105],'characters':'\u0451'},'&iogon;':{'codepoints':[303],'characters':'\u012F'},'&iopf;':{'codepoints':[120154],'characters':'\uD835\uDD5A'},'&iota;':{'codepoints':[953],'characters':'\u03B9'},'&iprod;':{'codepoints':[10812],'characters':'\u2A3C'},'&iquest':{'codepoints':[191],'characters':'\xBF'},'&iquest;':{'codepoints':[191],'characters':'\xBF'},'&iscr;':{'codepoints':[119998],'characters':'\uD835\uDCBE'},'&isin;':{'codepoints':[8712],'characters':'\u2208'},'&isinE;':{'codepoints':[8953],'characters':'\u22F9'},'&isindot;':{'codepoints':[8949],'characters':'\u22F5'},'&isins;':{'codepoints':[8948],'characters':'\u22F4'},'&isinsv;':{'codepoints':[8947],'characters':'\u22F3'},'&isinv;':{'codepoints':[8712],'characters':'\u2208'},'&it;':{'codepoints':[8290],'characters':'\u2062'},'&itilde;':{'codepoints':[297],'characters':'\u0129'},'&iukcy;':{'codepoints':[1110],'characters':'\u0456'},'&iuml':{'codepoints':[239],'characters':'\xEF'},'&iuml;':{'codepoints':[239],'characters':'\xEF'},'&jcirc;':{'codepoints':[309],'characters':'\u0135'},'&jcy;':{'codepoints':[1081],'characters':'\u0439'},'&jfr;':{'codepoints':[120103],'characters':'\uD835\uDD27'},'&jmath;':{'codepoints':[567],'characters':'\u0237'},'&jopf;':{'codepoints':[120155],'characters':'\uD835\uDD5B'},'&jscr;':{'codepoints':[119999],'characters':'\uD835\uDCBF'},'&jsercy;':{'codepoints':[1112],'characters':'\u0458'},'&jukcy;':{'codepoints':[1108],'characters':'\u0454'},'&kappa;':{'codepoints':[954],'characters':'\u03BA'},'&kappav;':{'codepoints':[1008],'characters':'\u03F0'},'&kcedil;':{'codepoints':[311],'characters':'\u0137'},'&kcy;':{'codepoints':[1082],'characters':'\u043A'},'&kfr;':{'codepoints':[120104],'characters':'\uD835\uDD28'},'&kgreen;':{'codepoints':[312],'characters':'\u0138'},'&khcy;':{'codepoints':[1093],'characters':'\u0445'},'&kjcy;':{'codepoints':[1116],'characters':'\u045C'},'&kopf;':{'codepoints':[120156],'characters':'\uD835\uDD5C'},'&kscr;':{'codepoints':[120000],'characters':'\uD835\uDCC0'},'&lAarr;':{'codepoints':[8666],'characters':'\u21DA'},'&lArr;':{'codepoints':[8656],'characters':'\u21D0'},'&lAtail;':{'codepoints':[10523],'characters':'\u291B'},'&lBarr;':{'codepoints':[10510],'characters':'\u290E'},'&lE;':{'codepoints':[8806],'characters':'\u2266'},'&lEg;':{'codepoints':[10891],'characters':'\u2A8B'},'&lHar;':{'codepoints':[10594],'characters':'\u2962'},'&lacute;':{'codepoints':[314],'characters':'\u013A'},'&laemptyv;':{'codepoints':[10676],'characters':'\u29B4'},'&lagran;':{'codepoints':[8466],'characters':'\u2112'},'&lambda;':{'codepoints':[955],'characters':'\u03BB'},'&lang;':{'codepoints':[10216],'characters':'\u27E8'},'&langd;':{'codepoints':[10641],'characters':'\u2991'},'&langle;':{'codepoints':[10216],'characters':'\u27E8'},'&lap;':{'codepoints':[10885],'characters':'\u2A85'},'&laquo':{'codepoints':[171],'characters':'\xAB'},'&laquo;':{'codepoints':[171],'characters':'\xAB'},'&larr;':{'codepoints':[8592],'characters':'\u2190'},'&larrb;':{'codepoints':[8676],'characters':'\u21E4'},'&larrbfs;':{'codepoints':[10527],'characters':'\u291F'},'&larrfs;':{'codepoints':[10525],'characters':'\u291D'},'&larrhk;':{'codepoints':[8617],'characters':'\u21A9'},'&larrlp;':{'codepoints':[8619],'characters':'\u21AB'},'&larrpl;':{'codepoints':[10553],'characters':'\u2939'},'&larrsim;':{'codepoints':[10611],'characters':'\u2973'},'&larrtl;':{'codepoints':[8610],'characters':'\u21A2'},'&lat;':{'codepoints':[10923],'characters':'\u2AAB'},'&latail;':{'codepoints':[10521],'characters':'\u2919'},'&late;':{'codepoints':[10925],'characters':'\u2AAD'},'&lates;':{'codepoints':[10925,65024],'characters':'\u2AAD\uFE00'},'&lbarr;':{'codepoints':[10508],'characters':'\u290C'},'&lbbrk;':{'codepoints':[10098],'characters':'\u2772'},'&lbrace;':{'codepoints':[123],'characters':'{'},'&lbrack;':{'codepoints':[91],'characters':'['},'&lbrke;':{'codepoints':[10635],'characters':'\u298B'},'&lbrksld;':{'codepoints':[10639],'characters':'\u298F'},'&lbrkslu;':{'codepoints':[10637],'characters':'\u298D'},'&lcaron;':{'codepoints':[318],'characters':'\u013E'},'&lcedil;':{'codepoints':[316],'characters':'\u013C'},'&lceil;':{'codepoints':[8968],'characters':'\u2308'},'&lcub;':{'codepoints':[123],'characters':'{'},'&lcy;':{'codepoints':[1083],'characters':'\u043B'},'&ldca;':{'codepoints':[10550],'characters':'\u2936'},'&ldquo;':{'codepoints':[8220],'characters':'\u201C'},'&ldquor;':{'codepoints':[8222],'characters':'\u201E'},'&ldrdhar;':{'codepoints':[10599],'characters':'\u2967'},'&ldrushar;':{'codepoints':[10571],'characters':'\u294B'},'&ldsh;':{'codepoints':[8626],'characters':'\u21B2'},'&le;':{'codepoints':[8804],'characters':'\u2264'},'&leftarrow;':{'codepoints':[8592],'characters':'\u2190'},'&leftarrowtail;':{'codepoints':[8610],'characters':'\u21A2'},'&leftharpoondown;':{'codepoints':[8637],'characters':'\u21BD'},'&leftharpoonup;':{'codepoints':[8636],'characters':'\u21BC'},'&leftleftarrows;':{'codepoints':[8647],'characters':'\u21C7'},'&leftrightarrow;':{'codepoints':[8596],'characters':'\u2194'},'&leftrightarrows;':{'codepoints':[8646],'characters':'\u21C6'},'&leftrightharpoons;':{'codepoints':[8651],'characters':'\u21CB'},'&leftrightsquigarrow;':{'codepoints':[8621],'characters':'\u21AD'},'&leftthreetimes;':{'codepoints':[8907],'characters':'\u22CB'},'&leg;':{'codepoints':[8922],'characters':'\u22DA'},'&leq;':{'codepoints':[8804],'characters':'\u2264'},'&leqq;':{'codepoints':[8806],'characters':'\u2266'},'&leqslant;':{'codepoints':[10877],'characters':'\u2A7D'},'&les;':{'codepoints':[10877],'characters':'\u2A7D'},'&lescc;':{'codepoints':[10920],'characters':'\u2AA8'},'&lesdot;':{'codepoints':[10879],'characters':'\u2A7F'},'&lesdoto;':{'codepoints':[10881],'characters':'\u2A81'},'&lesdotor;':{'codepoints':[10883],'characters':'\u2A83'},'&lesg;':{'codepoints':[8922,65024],'characters':'\u22DA\uFE00'},'&lesges;':{'codepoints':[10899],'characters':'\u2A93'},'&lessapprox;':{'codepoints':[10885],'characters':'\u2A85'},'&lessdot;':{'codepoints':[8918],'characters':'\u22D6'},'&lesseqgtr;':{'codepoints':[8922],'characters':'\u22DA'},'&lesseqqgtr;':{'codepoints':[10891],'characters':'\u2A8B'},'&lessgtr;':{'codepoints':[8822],'characters':'\u2276'},'&lesssim;':{'codepoints':[8818],'characters':'\u2272'},'&lfisht;':{'codepoints':[10620],'characters':'\u297C'},'&lfloor;':{'codepoints':[8970],'characters':'\u230A'},'&lfr;':{'codepoints':[120105],'characters':'\uD835\uDD29'},'&lg;':{'codepoints':[8822],'characters':'\u2276'},'&lgE;':{'codepoints':[10897],'characters':'\u2A91'},'&lhard;':{'codepoints':[8637],'characters':'\u21BD'},'&lharu;':{'codepoints':[8636],'characters':'\u21BC'},'&lharul;':{'codepoints':[10602],'characters':'\u296A'},'&lhblk;':{'codepoints':[9604],'characters':'\u2584'},'&ljcy;':{'codepoints':[1113],'characters':'\u0459'},'&ll;':{'codepoints':[8810],'characters':'\u226A'},'&llarr;':{'codepoints':[8647],'characters':'\u21C7'},'&llcorner;':{'codepoints':[8990],'characters':'\u231E'},'&llhard;':{'codepoints':[10603],'characters':'\u296B'},'&lltri;':{'codepoints':[9722],'characters':'\u25FA'},'&lmidot;':{'codepoints':[320],'characters':'\u0140'},'&lmoust;':{'codepoints':[9136],'characters':'\u23B0'},'&lmoustache;':{'codepoints':[9136],'characters':'\u23B0'},'&lnE;':{'codepoints':[8808],'characters':'\u2268'},'&lnap;':{'codepoints':[10889],'characters':'\u2A89'},'&lnapprox;':{'codepoints':[10889],'characters':'\u2A89'},'&lne;':{'codepoints':[10887],'characters':'\u2A87'},'&lneq;':{'codepoints':[10887],'characters':'\u2A87'},'&lneqq;':{'codepoints':[8808],'characters':'\u2268'},'&lnsim;':{'codepoints':[8934],'characters':'\u22E6'},'&loang;':{'codepoints':[10220],'characters':'\u27EC'},'&loarr;':{'codepoints':[8701],'characters':'\u21FD'},'&lobrk;':{'codepoints':[10214],'characters':'\u27E6'},'&longleftarrow;':{'codepoints':[10229],'characters':'\u27F5'},'&longleftrightarrow;':{'codepoints':[10231],'characters':'\u27F7'},'&longmapsto;':{'codepoints':[10236],'characters':'\u27FC'},'&longrightarrow;':{'codepoints':[10230],'characters':'\u27F6'},'&looparrowleft;':{'codepoints':[8619],'characters':'\u21AB'},'&looparrowright;':{'codepoints':[8620],'characters':'\u21AC'},'&lopar;':{'codepoints':[10629],'characters':'\u2985'},'&lopf;':{'codepoints':[120157],'characters':'\uD835\uDD5D'},'&loplus;':{'codepoints':[10797],'characters':'\u2A2D'},'&lotimes;':{'codepoints':[10804],'characters':'\u2A34'},'&lowast;':{'codepoints':[8727],'characters':'\u2217'},'&lowbar;':{'codepoints':[95],'characters':'_'},'&loz;':{'codepoints':[9674],'characters':'\u25CA'},'&lozenge;':{'codepoints':[9674],'characters':'\u25CA'},'&lozf;':{'codepoints':[10731],'characters':'\u29EB'},'&lpar;':{'codepoints':[40],'characters':'('},'&lparlt;':{'codepoints':[10643],'characters':'\u2993'},'&lrarr;':{'codepoints':[8646],'characters':'\u21C6'},'&lrcorner;':{'codepoints':[8991],'characters':'\u231F'},'&lrhar;':{'codepoints':[8651],'characters':'\u21CB'},'&lrhard;':{'codepoints':[10605],'characters':'\u296D'},'&lrm;':{'codepoints':[8206],'characters':'\u200E'},'&lrtri;':{'codepoints':[8895],'characters':'\u22BF'},'&lsaquo;':{'codepoints':[8249],'characters':'\u2039'},'&lscr;':{'codepoints':[120001],'characters':'\uD835\uDCC1'},'&lsh;':{'codepoints':[8624],'characters':'\u21B0'},'&lsim;':{'codepoints':[8818],'characters':'\u2272'},'&lsime;':{'codepoints':[10893],'characters':'\u2A8D'},'&lsimg;':{'codepoints':[10895],'characters':'\u2A8F'},'&lsqb;':{'codepoints':[91],'characters':'['},'&lsquo;':{'codepoints':[8216],'characters':'\u2018'},'&lsquor;':{'codepoints':[8218],'characters':'\u201A'},'&lstrok;':{'codepoints':[322],'characters':'\u0142'},'&lt':{'codepoints':[60],'characters':'<'},'&lt;':{'codepoints':[60],'characters':'<'},'&ltcc;':{'codepoints':[10918],'characters':'\u2AA6'},'&ltcir;':{'codepoints':[10873],'characters':'\u2A79'},'&ltdot;':{'codepoints':[8918],'characters':'\u22D6'},'&lthree;':{'codepoints':[8907],'characters':'\u22CB'},'&ltimes;':{'codepoints':[8905],'characters':'\u22C9'},'&ltlarr;':{'codepoints':[10614],'characters':'\u2976'},'&ltquest;':{'codepoints':[10875],'characters':'\u2A7B'},'&ltrPar;':{'codepoints':[10646],'characters':'\u2996'},'&ltri;':{'codepoints':[9667],'characters':'\u25C3'},'&ltrie;':{'codepoints':[8884],'characters':'\u22B4'},'&ltrif;':{'codepoints':[9666],'characters':'\u25C2'},'&lurdshar;':{'codepoints':[10570],'characters':'\u294A'},'&luruhar;':{'codepoints':[10598],'characters':'\u2966'},'&lvertneqq;':{'codepoints':[8808,65024],'characters':'\u2268\uFE00'},'&lvnE;':{'codepoints':[8808,65024],'characters':'\u2268\uFE00'},'&mDDot;':{'codepoints':[8762],'characters':'\u223A'},'&macr':{'codepoints':[175],'characters':'\xAF'},'&macr;':{'codepoints':[175],'characters':'\xAF'},'&male;':{'codepoints':[9794],'characters':'\u2642'},'&malt;':{'codepoints':[10016],'characters':'\u2720'},'&maltese;':{'codepoints':[10016],'characters':'\u2720'},'&map;':{'codepoints':[8614],'characters':'\u21A6'},'&mapsto;':{'codepoints':[8614],'characters':'\u21A6'},'&mapstodown;':{'codepoints':[8615],'characters':'\u21A7'},'&mapstoleft;':{'codepoints':[8612],'characters':'\u21A4'},'&mapstoup;':{'codepoints':[8613],'characters':'\u21A5'},'&marker;':{'codepoints':[9646],'characters':'\u25AE'},'&mcomma;':{'codepoints':[10793],'characters':'\u2A29'},'&mcy;':{'codepoints':[1084],'characters':'\u043C'},'&mdash;':{'codepoints':[8212],'characters':'\u2014'},'&measuredangle;':{'codepoints':[8737],'characters':'\u2221'},'&mfr;':{'codepoints':[120106],'characters':'\uD835\uDD2A'},'&mho;':{'codepoints':[8487],'characters':'\u2127'},'&micro':{'codepoints':[181],'characters':'\xB5'},'&micro;':{'codepoints':[181],'characters':'\xB5'},'&mid;':{'codepoints':[8739],'characters':'\u2223'},'&midast;':{'codepoints':[42],'characters':'*'},'&midcir;':{'codepoints':[10992],'characters':'\u2AF0'},'&middot':{'codepoints':[183],'characters':'\xB7'},'&middot;':{'codepoints':[183],'characters':'\xB7'},'&minus;':{'codepoints':[8722],'characters':'\u2212'},'&minusb;':{'codepoints':[8863],'characters':'\u229F'},'&minusd;':{'codepoints':[8760],'characters':'\u2238'},'&minusdu;':{'codepoints':[10794],'characters':'\u2A2A'},'&mlcp;':{'codepoints':[10971],'characters':'\u2ADB'},'&mldr;':{'codepoints':[8230],'characters':'\u2026'},'&mnplus;':{'codepoints':[8723],'characters':'\u2213'},'&models;':{'codepoints':[8871],'characters':'\u22A7'},'&mopf;':{'codepoints':[120158],'characters':'\uD835\uDD5E'},'&mp;':{'codepoints':[8723],'characters':'\u2213'},'&mscr;':{'codepoints':[120002],'characters':'\uD835\uDCC2'},'&mstpos;':{'codepoints':[8766],'characters':'\u223E'},'&mu;':{'codepoints':[956],'characters':'\u03BC'},'&multimap;':{'codepoints':[8888],'characters':'\u22B8'},'&mumap;':{'codepoints':[8888],'characters':'\u22B8'},'&nGg;':{'codepoints':[8921,824],'characters':'\u22D9\u0338'},'&nGt;':{'codepoints':[8811,8402],'characters':'\u226B\u20D2'},'&nGtv;':{'codepoints':[8811,824],'characters':'\u226B\u0338'},'&nLeftarrow;':{'codepoints':[8653],'characters':'\u21CD'},'&nLeftrightarrow;':{'codepoints':[8654],'characters':'\u21CE'},'&nLl;':{'codepoints':[8920,824],'characters':'\u22D8\u0338'},'&nLt;':{'codepoints':[8810,8402],'characters':'\u226A\u20D2'},'&nLtv;':{'codepoints':[8810,824],'characters':'\u226A\u0338'},'&nRightarrow;':{'codepoints':[8655],'characters':'\u21CF'},'&nVDash;':{'codepoints':[8879],'characters':'\u22AF'},'&nVdash;':{'codepoints':[8878],'characters':'\u22AE'},'&nabla;':{'codepoints':[8711],'characters':'\u2207'},'&nacute;':{'codepoints':[324],'characters':'\u0144'},'&nang;':{'codepoints':[8736,8402],'characters':'\u2220\u20D2'},'&nap;':{'codepoints':[8777],'characters':'\u2249'},'&napE;':{'codepoints':[10864,824],'characters':'\u2A70\u0338'},'&napid;':{'codepoints':[8779,824],'characters':'\u224B\u0338'},'&napos;':{'codepoints':[329],'characters':'\u0149'},'&napprox;':{'codepoints':[8777],'characters':'\u2249'},'&natur;':{'codepoints':[9838],'characters':'\u266E'},'&natural;':{'codepoints':[9838],'characters':'\u266E'},'&naturals;':{'codepoints':[8469],'characters':'\u2115'},'&nbsp':{'codepoints':[160],'characters':'\xA0'},'&nbsp;':{'codepoints':[160],'characters':'\xA0'},'&nbump;':{'codepoints':[8782,824],'characters':'\u224E\u0338'},'&nbumpe;':{'codepoints':[8783,824],'characters':'\u224F\u0338'},'&ncap;':{'codepoints':[10819],'characters':'\u2A43'},'&ncaron;':{'codepoints':[328],'characters':'\u0148'},'&ncedil;':{'codepoints':[326],'characters':'\u0146'},'&ncong;':{'codepoints':[8775],'characters':'\u2247'},'&ncongdot;':{'codepoints':[10861,824],'characters':'\u2A6D\u0338'},'&ncup;':{'codepoints':[10818],'characters':'\u2A42'},'&ncy;':{'codepoints':[1085],'characters':'\u043D'},'&ndash;':{'codepoints':[8211],'characters':'\u2013'},'&ne;':{'codepoints':[8800],'characters':'\u2260'},'&neArr;':{'codepoints':[8663],'characters':'\u21D7'},'&nearhk;':{'codepoints':[10532],'characters':'\u2924'},'&nearr;':{'codepoints':[8599],'characters':'\u2197'},'&nearrow;':{'codepoints':[8599],'characters':'\u2197'},'&nedot;':{'codepoints':[8784,824],'characters':'\u2250\u0338'},'&nequiv;':{'codepoints':[8802],'characters':'\u2262'},'&nesear;':{'codepoints':[10536],'characters':'\u2928'},'&nesim;':{'codepoints':[8770,824],'characters':'\u2242\u0338'},'&nexist;':{'codepoints':[8708],'characters':'\u2204'},'&nexists;':{'codepoints':[8708],'characters':'\u2204'},'&nfr;':{'codepoints':[120107],'characters':'\uD835\uDD2B'},'&ngE;':{'codepoints':[8807,824],'characters':'\u2267\u0338'},'&nge;':{'codepoints':[8817],'characters':'\u2271'},'&ngeq;':{'codepoints':[8817],'characters':'\u2271'},'&ngeqq;':{'codepoints':[8807,824],'characters':'\u2267\u0338'},'&ngeqslant;':{'codepoints':[10878,824],'characters':'\u2A7E\u0338'},'&nges;':{'codepoints':[10878,824],'characters':'\u2A7E\u0338'},'&ngsim;':{'codepoints':[8821],'characters':'\u2275'},'&ngt;':{'codepoints':[8815],'characters':'\u226F'},'&ngtr;':{'codepoints':[8815],'characters':'\u226F'},'&nhArr;':{'codepoints':[8654],'characters':'\u21CE'},'&nharr;':{'codepoints':[8622],'characters':'\u21AE'},'&nhpar;':{'codepoints':[10994],'characters':'\u2AF2'},'&ni;':{'codepoints':[8715],'characters':'\u220B'},'&nis;':{'codepoints':[8956],'characters':'\u22FC'},'&nisd;':{'codepoints':[8954],'characters':'\u22FA'},'&niv;':{'codepoints':[8715],'characters':'\u220B'},'&njcy;':{'codepoints':[1114],'characters':'\u045A'},'&nlArr;':{'codepoints':[8653],'characters':'\u21CD'},'&nlE;':{'codepoints':[8806,824],'characters':'\u2266\u0338'},'&nlarr;':{'codepoints':[8602],'characters':'\u219A'},'&nldr;':{'codepoints':[8229],'characters':'\u2025'},'&nle;':{'codepoints':[8816],'characters':'\u2270'},'&nleftarrow;':{'codepoints':[8602],'characters':'\u219A'},'&nleftrightarrow;':{'codepoints':[8622],'characters':'\u21AE'},'&nleq;':{'codepoints':[8816],'characters':'\u2270'},'&nleqq;':{'codepoints':[8806,824],'characters':'\u2266\u0338'},'&nleqslant;':{'codepoints':[10877,824],'characters':'\u2A7D\u0338'},'&nles;':{'codepoints':[10877,824],'characters':'\u2A7D\u0338'},'&nless;':{'codepoints':[8814],'characters':'\u226E'},'&nlsim;':{'codepoints':[8820],'characters':'\u2274'},'&nlt;':{'codepoints':[8814],'characters':'\u226E'},'&nltri;':{'codepoints':[8938],'characters':'\u22EA'},'&nltrie;':{'codepoints':[8940],'characters':'\u22EC'},'&nmid;':{'codepoints':[8740],'characters':'\u2224'},'&nopf;':{'codepoints':[120159],'characters':'\uD835\uDD5F'},'&not':{'codepoints':[172],'characters':'\xAC'},'&not;':{'codepoints':[172],'characters':'\xAC'},'&notin;':{'codepoints':[8713],'characters':'\u2209'},'&notinE;':{'codepoints':[8953,824],'characters':'\u22F9\u0338'},'&notindot;':{'codepoints':[8949,824],'characters':'\u22F5\u0338'},'&notinva;':{'codepoints':[8713],'characters':'\u2209'},'&notinvb;':{'codepoints':[8951],'characters':'\u22F7'},'&notinvc;':{'codepoints':[8950],'characters':'\u22F6'},'&notni;':{'codepoints':[8716],'characters':'\u220C'},'&notniva;':{'codepoints':[8716],'characters':'\u220C'},'&notnivb;':{'codepoints':[8958],'characters':'\u22FE'},'&notnivc;':{'codepoints':[8957],'characters':'\u22FD'},'&npar;':{'codepoints':[8742],'characters':'\u2226'},'&nparallel;':{'codepoints':[8742],'characters':'\u2226'},'&nparsl;':{'codepoints':[11005,8421],'characters':'\u2AFD\u20E5'},'&npart;':{'codepoints':[8706,824],'characters':'\u2202\u0338'},'&npolint;':{'codepoints':[10772],'characters':'\u2A14'},'&npr;':{'codepoints':[8832],'characters':'\u2280'},'&nprcue;':{'codepoints':[8928],'characters':'\u22E0'},'&npre;':{'codepoints':[10927,824],'characters':'\u2AAF\u0338'},'&nprec;':{'codepoints':[8832],'characters':'\u2280'},'&npreceq;':{'codepoints':[10927,824],'characters':'\u2AAF\u0338'},'&nrArr;':{'codepoints':[8655],'characters':'\u21CF'},'&nrarr;':{'codepoints':[8603],'characters':'\u219B'},'&nrarrc;':{'codepoints':[10547,824],'characters':'\u2933\u0338'},'&nrarrw;':{'codepoints':[8605,824],'characters':'\u219D\u0338'},'&nrightarrow;':{'codepoints':[8603],'characters':'\u219B'},'&nrtri;':{'codepoints':[8939],'characters':'\u22EB'},'&nrtrie;':{'codepoints':[8941],'characters':'\u22ED'},'&nsc;':{'codepoints':[8833],'characters':'\u2281'},'&nsccue;':{'codepoints':[8929],'characters':'\u22E1'},'&nsce;':{'codepoints':[10928,824],'characters':'\u2AB0\u0338'},'&nscr;':{'codepoints':[120003],'characters':'\uD835\uDCC3'},'&nshortmid;':{'codepoints':[8740],'characters':'\u2224'},'&nshortparallel;':{'codepoints':[8742],'characters':'\u2226'},'&nsim;':{'codepoints':[8769],'characters':'\u2241'},'&nsime;':{'codepoints':[8772],'characters':'\u2244'},'&nsimeq;':{'codepoints':[8772],'characters':'\u2244'},'&nsmid;':{'codepoints':[8740],'characters':'\u2224'},'&nspar;':{'codepoints':[8742],'characters':'\u2226'},'&nsqsube;':{'codepoints':[8930],'characters':'\u22E2'},'&nsqsupe;':{'codepoints':[8931],'characters':'\u22E3'},'&nsub;':{'codepoints':[8836],'characters':'\u2284'},'&nsubE;':{'codepoints':[10949,824],'characters':'\u2AC5\u0338'},'&nsube;':{'codepoints':[8840],'characters':'\u2288'},'&nsubset;':{'codepoints':[8834,8402],'characters':'\u2282\u20D2'},'&nsubseteq;':{'codepoints':[8840],'characters':'\u2288'},'&nsubseteqq;':{'codepoints':[10949,824],'characters':'\u2AC5\u0338'},'&nsucc;':{'codepoints':[8833],'characters':'\u2281'},'&nsucceq;':{'codepoints':[10928,824],'characters':'\u2AB0\u0338'},'&nsup;':{'codepoints':[8837],'characters':'\u2285'},'&nsupE;':{'codepoints':[10950,824],'characters':'\u2AC6\u0338'},'&nsupe;':{'codepoints':[8841],'characters':'\u2289'},'&nsupset;':{'codepoints':[8835,8402],'characters':'\u2283\u20D2'},'&nsupseteq;':{'codepoints':[8841],'characters':'\u2289'},'&nsupseteqq;':{'codepoints':[10950,824],'characters':'\u2AC6\u0338'},'&ntgl;':{'codepoints':[8825],'characters':'\u2279'},'&ntilde':{'codepoints':[241],'characters':'\xF1'},'&ntilde;':{'codepoints':[241],'characters':'\xF1'},'&ntlg;':{'codepoints':[8824],'characters':'\u2278'},'&ntriangleleft;':{'codepoints':[8938],'characters':'\u22EA'},'&ntrianglelefteq;':{'codepoints':[8940],'characters':'\u22EC'},'&ntriangleright;':{'codepoints':[8939],'characters':'\u22EB'},'&ntrianglerighteq;':{'codepoints':[8941],'characters':'\u22ED'},'&nu;':{'codepoints':[957],'characters':'\u03BD'},'&num;':{'codepoints':[35],'characters':'#'},'&numero;':{'codepoints':[8470],'characters':'\u2116'},'&numsp;':{'codepoints':[8199],'characters':'\u2007'},'&nvDash;':{'codepoints':[8877],'characters':'\u22AD'},'&nvHarr;':{'codepoints':[10500],'characters':'\u2904'},'&nvap;':{'codepoints':[8781,8402],'characters':'\u224D\u20D2'},'&nvdash;':{'codepoints':[8876],'characters':'\u22AC'},'&nvge;':{'codepoints':[8805,8402],'characters':'\u2265\u20D2'},'&nvgt;':{'codepoints':[62,8402],'characters':'>\u20D2'},'&nvinfin;':{'codepoints':[10718],'characters':'\u29DE'},'&nvlArr;':{'codepoints':[10498],'characters':'\u2902'},'&nvle;':{'codepoints':[8804,8402],'characters':'\u2264\u20D2'},'&nvlt;':{'codepoints':[60,8402],'characters':'<\u20D2'},'&nvltrie;':{'codepoints':[8884,8402],'characters':'\u22B4\u20D2'},'&nvrArr;':{'codepoints':[10499],'characters':'\u2903'},'&nvrtrie;':{'codepoints':[8885,8402],'characters':'\u22B5\u20D2'},'&nvsim;':{'codepoints':[8764,8402],'characters':'\u223C\u20D2'},'&nwArr;':{'codepoints':[8662],'characters':'\u21D6'},'&nwarhk;':{'codepoints':[10531],'characters':'\u2923'},'&nwarr;':{'codepoints':[8598],'characters':'\u2196'},'&nwarrow;':{'codepoints':[8598],'characters':'\u2196'},'&nwnear;':{'codepoints':[10535],'characters':'\u2927'},'&oS;':{'codepoints':[9416],'characters':'\u24C8'},'&oacute':{'codepoints':[243],'characters':'\xF3'},'&oacute;':{'codepoints':[243],'characters':'\xF3'},'&oast;':{'codepoints':[8859],'characters':'\u229B'},'&ocir;':{'codepoints':[8858],'characters':'\u229A'},'&ocirc':{'codepoints':[244],'characters':'\xF4'},'&ocirc;':{'codepoints':[244],'characters':'\xF4'},'&ocy;':{'codepoints':[1086],'characters':'\u043E'},'&odash;':{'codepoints':[8861],'characters':'\u229D'},'&odblac;':{'codepoints':[337],'characters':'\u0151'},'&odiv;':{'codepoints':[10808],'characters':'\u2A38'},'&odot;':{'codepoints':[8857],'characters':'\u2299'},'&odsold;':{'codepoints':[10684],'characters':'\u29BC'},'&oelig;':{'codepoints':[339],'characters':'\u0153'},'&ofcir;':{'codepoints':[10687],'characters':'\u29BF'},'&ofr;':{'codepoints':[120108],'characters':'\uD835\uDD2C'},'&ogon;':{'codepoints':[731],'characters':'\u02DB'},'&ograve':{'codepoints':[242],'characters':'\xF2'},'&ograve;':{'codepoints':[242],'characters':'\xF2'},'&ogt;':{'codepoints':[10689],'characters':'\u29C1'},'&ohbar;':{'codepoints':[10677],'characters':'\u29B5'},'&ohm;':{'codepoints':[937],'characters':'\u03A9'},'&oint;':{'codepoints':[8750],'characters':'\u222E'},'&olarr;':{'codepoints':[8634],'characters':'\u21BA'},'&olcir;':{'codepoints':[10686],'characters':'\u29BE'},'&olcross;':{'codepoints':[10683],'characters':'\u29BB'},'&oline;':{'codepoints':[8254],'characters':'\u203E'},'&olt;':{'codepoints':[10688],'characters':'\u29C0'},'&omacr;':{'codepoints':[333],'characters':'\u014D'},'&omega;':{'codepoints':[969],'characters':'\u03C9'},'&omicron;':{'codepoints':[959],'characters':'\u03BF'},'&omid;':{'codepoints':[10678],'characters':'\u29B6'},'&ominus;':{'codepoints':[8854],'characters':'\u2296'},'&oopf;':{'codepoints':[120160],'characters':'\uD835\uDD60'},'&opar;':{'codepoints':[10679],'characters':'\u29B7'},'&operp;':{'codepoints':[10681],'characters':'\u29B9'},'&oplus;':{'codepoints':[8853],'characters':'\u2295'},'&or;':{'codepoints':[8744],'characters':'\u2228'},'&orarr;':{'codepoints':[8635],'characters':'\u21BB'},'&ord;':{'codepoints':[10845],'characters':'\u2A5D'},'&order;':{'codepoints':[8500],'characters':'\u2134'},'&orderof;':{'codepoints':[8500],'characters':'\u2134'},'&ordf':{'codepoints':[170],'characters':'\xAA'},'&ordf;':{'codepoints':[170],'characters':'\xAA'},'&ordm':{'codepoints':[186],'characters':'\xBA'},'&ordm;':{'codepoints':[186],'characters':'\xBA'},'&origof;':{'codepoints':[8886],'characters':'\u22B6'},'&oror;':{'codepoints':[10838],'characters':'\u2A56'},'&orslope;':{'codepoints':[10839],'characters':'\u2A57'},'&orv;':{'codepoints':[10843],'characters':'\u2A5B'},'&oscr;':{'codepoints':[8500],'characters':'\u2134'},'&oslash':{'codepoints':[248],'characters':'\xF8'},'&oslash;':{'codepoints':[248],'characters':'\xF8'},'&osol;':{'codepoints':[8856],'characters':'\u2298'},'&otilde':{'codepoints':[245],'characters':'\xF5'},'&otilde;':{'codepoints':[245],'characters':'\xF5'},'&otimes;':{'codepoints':[8855],'characters':'\u2297'},'&otimesas;':{'codepoints':[10806],'characters':'\u2A36'},'&ouml':{'codepoints':[246],'characters':'\xF6'},'&ouml;':{'codepoints':[246],'characters':'\xF6'},'&ovbar;':{'codepoints':[9021],'characters':'\u233D'},'&par;':{'codepoints':[8741],'characters':'\u2225'},'&para':{'codepoints':[182],'characters':'\xB6'},'&para;':{'codepoints':[182],'characters':'\xB6'},'&parallel;':{'codepoints':[8741],'characters':'\u2225'},'&parsim;':{'codepoints':[10995],'characters':'\u2AF3'},'&parsl;':{'codepoints':[11005],'characters':'\u2AFD'},'&part;':{'codepoints':[8706],'characters':'\u2202'},'&pcy;':{'codepoints':[1087],'characters':'\u043F'},'&percnt;':{'codepoints':[37],'characters':'%'},'&period;':{'codepoints':[46],'characters':'.'},'&permil;':{'codepoints':[8240],'characters':'\u2030'},'&perp;':{'codepoints':[8869],'characters':'\u22A5'},'&pertenk;':{'codepoints':[8241],'characters':'\u2031'},'&pfr;':{'codepoints':[120109],'characters':'\uD835\uDD2D'},'&phi;':{'codepoints':[966],'characters':'\u03C6'},'&phiv;':{'codepoints':[981],'characters':'\u03D5'},'&phmmat;':{'codepoints':[8499],'characters':'\u2133'},'&phone;':{'codepoints':[9742],'characters':'\u260E'},'&pi;':{'codepoints':[960],'characters':'\u03C0'},'&pitchfork;':{'codepoints':[8916],'characters':'\u22D4'},'&piv;':{'codepoints':[982],'characters':'\u03D6'},'&planck;':{'codepoints':[8463],'characters':'\u210F'},'&planckh;':{'codepoints':[8462],'characters':'\u210E'},'&plankv;':{'codepoints':[8463],'characters':'\u210F'},'&plus;':{'codepoints':[43],'characters':'+'},'&plusacir;':{'codepoints':[10787],'characters':'\u2A23'},'&plusb;':{'codepoints':[8862],'characters':'\u229E'},'&pluscir;':{'codepoints':[10786],'characters':'\u2A22'},'&plusdo;':{'codepoints':[8724],'characters':'\u2214'},'&plusdu;':{'codepoints':[10789],'characters':'\u2A25'},'&pluse;':{'codepoints':[10866],'characters':'\u2A72'},'&plusmn':{'codepoints':[177],'characters':'\xB1'},'&plusmn;':{'codepoints':[177],'characters':'\xB1'},'&plussim;':{'codepoints':[10790],'characters':'\u2A26'},'&plustwo;':{'codepoints':[10791],'characters':'\u2A27'},'&pm;':{'codepoints':[177],'characters':'\xB1'},'&pointint;':{'codepoints':[10773],'characters':'\u2A15'},'&popf;':{'codepoints':[120161],'characters':'\uD835\uDD61'},'&pound':{'codepoints':[163],'characters':'\xA3'},'&pound;':{'codepoints':[163],'characters':'\xA3'},'&pr;':{'codepoints':[8826],'characters':'\u227A'},'&prE;':{'codepoints':[10931],'characters':'\u2AB3'},'&prap;':{'codepoints':[10935],'characters':'\u2AB7'},'&prcue;':{'codepoints':[8828],'characters':'\u227C'},'&pre;':{'codepoints':[10927],'characters':'\u2AAF'},'&prec;':{'codepoints':[8826],'characters':'\u227A'},'&precapprox;':{'codepoints':[10935],'characters':'\u2AB7'},'&preccurlyeq;':{'codepoints':[8828],'characters':'\u227C'},'&preceq;':{'codepoints':[10927],'characters':'\u2AAF'},'&precnapprox;':{'codepoints':[10937],'characters':'\u2AB9'},'&precneqq;':{'codepoints':[10933],'characters':'\u2AB5'},'&precnsim;':{'codepoints':[8936],'characters':'\u22E8'},'&precsim;':{'codepoints':[8830],'characters':'\u227E'},'&prime;':{'codepoints':[8242],'characters':'\u2032'},'&primes;':{'codepoints':[8473],'characters':'\u2119'},'&prnE;':{'codepoints':[10933],'characters':'\u2AB5'},'&prnap;':{'codepoints':[10937],'characters':'\u2AB9'},'&prnsim;':{'codepoints':[8936],'characters':'\u22E8'},'&prod;':{'codepoints':[8719],'characters':'\u220F'},'&profalar;':{'codepoints':[9006],'characters':'\u232E'},'&profline;':{'codepoints':[8978],'characters':'\u2312'},'&profsurf;':{'codepoints':[8979],'characters':'\u2313'},'&prop;':{'codepoints':[8733],'characters':'\u221D'},'&propto;':{'codepoints':[8733],'characters':'\u221D'},'&prsim;':{'codepoints':[8830],'characters':'\u227E'},'&prurel;':{'codepoints':[8880],'characters':'\u22B0'},'&pscr;':{'codepoints':[120005],'characters':'\uD835\uDCC5'},'&psi;':{'codepoints':[968],'characters':'\u03C8'},'&puncsp;':{'codepoints':[8200],'characters':'\u2008'},'&qfr;':{'codepoints':[120110],'characters':'\uD835\uDD2E'},'&qint;':{'codepoints':[10764],'characters':'\u2A0C'},'&qopf;':{'codepoints':[120162],'characters':'\uD835\uDD62'},'&qprime;':{'codepoints':[8279],'characters':'\u2057'},'&qscr;':{'codepoints':[120006],'characters':'\uD835\uDCC6'},'&quaternions;':{'codepoints':[8461],'characters':'\u210D'},'&quatint;':{'codepoints':[10774],'characters':'\u2A16'},'&quest;':{'codepoints':[63],'characters':'?'},'&questeq;':{'codepoints':[8799],'characters':'\u225F'},'&quot':{'codepoints':[34],'characters':'"'},'&quot;':{'codepoints':[34],'characters':'"'},'&rAarr;':{'codepoints':[8667],'characters':'\u21DB'},'&rArr;':{'codepoints':[8658],'characters':'\u21D2'},'&rAtail;':{'codepoints':[10524],'characters':'\u291C'},'&rBarr;':{'codepoints':[10511],'characters':'\u290F'},'&rHar;':{'codepoints':[10596],'characters':'\u2964'},'&race;':{'codepoints':[8765,817],'characters':'\u223D\u0331'},'&racute;':{'codepoints':[341],'characters':'\u0155'},'&radic;':{'codepoints':[8730],'characters':'\u221A'},'&raemptyv;':{'codepoints':[10675],'characters':'\u29B3'},'&rang;':{'codepoints':[10217],'characters':'\u27E9'},'&rangd;':{'codepoints':[10642],'characters':'\u2992'},'&range;':{'codepoints':[10661],'characters':'\u29A5'},'&rangle;':{'codepoints':[10217],'characters':'\u27E9'},'&raquo':{'codepoints':[187],'characters':'\xBB'},'&raquo;':{'codepoints':[187],'characters':'\xBB'},'&rarr;':{'codepoints':[8594],'characters':'\u2192'},'&rarrap;':{'codepoints':[10613],'characters':'\u2975'},'&rarrb;':{'codepoints':[8677],'characters':'\u21E5'},'&rarrbfs;':{'codepoints':[10528],'characters':'\u2920'},'&rarrc;':{'codepoints':[10547],'characters':'\u2933'},'&rarrfs;':{'codepoints':[10526],'characters':'\u291E'},'&rarrhk;':{'codepoints':[8618],'characters':'\u21AA'},'&rarrlp;':{'codepoints':[8620],'characters':'\u21AC'},'&rarrpl;':{'codepoints':[10565],'characters':'\u2945'},'&rarrsim;':{'codepoints':[10612],'characters':'\u2974'},'&rarrtl;':{'codepoints':[8611],'characters':'\u21A3'},'&rarrw;':{'codepoints':[8605],'characters':'\u219D'},'&ratail;':{'codepoints':[10522],'characters':'\u291A'},'&ratio;':{'codepoints':[8758],'characters':'\u2236'},'&rationals;':{'codepoints':[8474],'characters':'\u211A'},'&rbarr;':{'codepoints':[10509],'characters':'\u290D'},'&rbbrk;':{'codepoints':[10099],'characters':'\u2773'},'&rbrace;':{'codepoints':[125],'characters':'}'},'&rbrack;':{'codepoints':[93],'characters':']'},'&rbrke;':{'codepoints':[10636],'characters':'\u298C'},'&rbrksld;':{'codepoints':[10638],'characters':'\u298E'},'&rbrkslu;':{'codepoints':[10640],'characters':'\u2990'},'&rcaron;':{'codepoints':[345],'characters':'\u0159'},'&rcedil;':{'codepoints':[343],'characters':'\u0157'},'&rceil;':{'codepoints':[8969],'characters':'\u2309'},'&rcub;':{'codepoints':[125],'characters':'}'},'&rcy;':{'codepoints':[1088],'characters':'\u0440'},'&rdca;':{'codepoints':[10551],'characters':'\u2937'},'&rdldhar;':{'codepoints':[10601],'characters':'\u2969'},'&rdquo;':{'codepoints':[8221],'characters':'\u201D'},'&rdquor;':{'codepoints':[8221],'characters':'\u201D'},'&rdsh;':{'codepoints':[8627],'characters':'\u21B3'},'&real;':{'codepoints':[8476],'characters':'\u211C'},'&realine;':{'codepoints':[8475],'characters':'\u211B'},'&realpart;':{'codepoints':[8476],'characters':'\u211C'},'&reals;':{'codepoints':[8477],'characters':'\u211D'},'&rect;':{'codepoints':[9645],'characters':'\u25AD'},'&reg':{'codepoints':[174],'characters':'\xAE'},'&reg;':{'codepoints':[174],'characters':'\xAE'},'&rfisht;':{'codepoints':[10621],'characters':'\u297D'},'&rfloor;':{'codepoints':[8971],'characters':'\u230B'},'&rfr;':{'codepoints':[120111],'characters':'\uD835\uDD2F'},'&rhard;':{'codepoints':[8641],'characters':'\u21C1'},'&rharu;':{'codepoints':[8640],'characters':'\u21C0'},'&rharul;':{'codepoints':[10604],'characters':'\u296C'},'&rho;':{'codepoints':[961],'characters':'\u03C1'},'&rhov;':{'codepoints':[1009],'characters':'\u03F1'},'&rightarrow;':{'codepoints':[8594],'characters':'\u2192'},'&rightarrowtail;':{'codepoints':[8611],'characters':'\u21A3'},'&rightharpoondown;':{'codepoints':[8641],'characters':'\u21C1'},'&rightharpoonup;':{'codepoints':[8640],'characters':'\u21C0'},'&rightleftarrows;':{'codepoints':[8644],'characters':'\u21C4'},'&rightleftharpoons;':{'codepoints':[8652],'characters':'\u21CC'},'&rightrightarrows;':{'codepoints':[8649],'characters':'\u21C9'},'&rightsquigarrow;':{'codepoints':[8605],'characters':'\u219D'},'&rightthreetimes;':{'codepoints':[8908],'characters':'\u22CC'},'&ring;':{'codepoints':[730],'characters':'\u02DA'},'&risingdotseq;':{'codepoints':[8787],'characters':'\u2253'},'&rlarr;':{'codepoints':[8644],'characters':'\u21C4'},'&rlhar;':{'codepoints':[8652],'characters':'\u21CC'},'&rlm;':{'codepoints':[8207],'characters':'\u200F'},'&rmoust;':{'codepoints':[9137],'characters':'\u23B1'},'&rmoustache;':{'codepoints':[9137],'characters':'\u23B1'},'&rnmid;':{'codepoints':[10990],'characters':'\u2AEE'},'&roang;':{'codepoints':[10221],'characters':'\u27ED'},'&roarr;':{'codepoints':[8702],'characters':'\u21FE'},'&robrk;':{'codepoints':[10215],'characters':'\u27E7'},'&ropar;':{'codepoints':[10630],'characters':'\u2986'},'&ropf;':{'codepoints':[120163],'characters':'\uD835\uDD63'},'&roplus;':{'codepoints':[10798],'characters':'\u2A2E'},'&rotimes;':{'codepoints':[10805],'characters':'\u2A35'},'&rpar;':{'codepoints':[41],'characters':')'},'&rpargt;':{'codepoints':[10644],'characters':'\u2994'},'&rppolint;':{'codepoints':[10770],'characters':'\u2A12'},'&rrarr;':{'codepoints':[8649],'characters':'\u21C9'},'&rsaquo;':{'codepoints':[8250],'characters':'\u203A'},'&rscr;':{'codepoints':[120007],'characters':'\uD835\uDCC7'},'&rsh;':{'codepoints':[8625],'characters':'\u21B1'},'&rsqb;':{'codepoints':[93],'characters':']'},'&rsquo;':{'codepoints':[8217],'characters':'\u2019'},'&rsquor;':{'codepoints':[8217],'characters':'\u2019'},'&rthree;':{'codepoints':[8908],'characters':'\u22CC'},'&rtimes;':{'codepoints':[8906],'characters':'\u22CA'},'&rtri;':{'codepoints':[9657],'characters':'\u25B9'},'&rtrie;':{'codepoints':[8885],'characters':'\u22B5'},'&rtrif;':{'codepoints':[9656],'characters':'\u25B8'},'&rtriltri;':{'codepoints':[10702],'characters':'\u29CE'},'&ruluhar;':{'codepoints':[10600],'characters':'\u2968'},'&rx;':{'codepoints':[8478],'characters':'\u211E'},'&sacute;':{'codepoints':[347],'characters':'\u015B'},'&sbquo;':{'codepoints':[8218],'characters':'\u201A'},'&sc;':{'codepoints':[8827],'characters':'\u227B'},'&scE;':{'codepoints':[10932],'characters':'\u2AB4'},'&scap;':{'codepoints':[10936],'characters':'\u2AB8'},'&scaron;':{'codepoints':[353],'characters':'\u0161'},'&sccue;':{'codepoints':[8829],'characters':'\u227D'},'&sce;':{'codepoints':[10928],'characters':'\u2AB0'},'&scedil;':{'codepoints':[351],'characters':'\u015F'},'&scirc;':{'codepoints':[349],'characters':'\u015D'},'&scnE;':{'codepoints':[10934],'characters':'\u2AB6'},'&scnap;':{'codepoints':[10938],'characters':'\u2ABA'},'&scnsim;':{'codepoints':[8937],'characters':'\u22E9'},'&scpolint;':{'codepoints':[10771],'characters':'\u2A13'},'&scsim;':{'codepoints':[8831],'characters':'\u227F'},'&scy;':{'codepoints':[1089],'characters':'\u0441'},'&sdot;':{'codepoints':[8901],'characters':'\u22C5'},'&sdotb;':{'codepoints':[8865],'characters':'\u22A1'},'&sdote;':{'codepoints':[10854],'characters':'\u2A66'},'&seArr;':{'codepoints':[8664],'characters':'\u21D8'},'&searhk;':{'codepoints':[10533],'characters':'\u2925'},'&searr;':{'codepoints':[8600],'characters':'\u2198'},'&searrow;':{'codepoints':[8600],'characters':'\u2198'},'&sect':{'codepoints':[167],'characters':'\xA7'},'&sect;':{'codepoints':[167],'characters':'\xA7'},'&semi;':{'codepoints':[59],'characters':';'},'&seswar;':{'codepoints':[10537],'characters':'\u2929'},'&setminus;':{'codepoints':[8726],'characters':'\u2216'},'&setmn;':{'codepoints':[8726],'characters':'\u2216'},'&sext;':{'codepoints':[10038],'characters':'\u2736'},'&sfr;':{'codepoints':[120112],'characters':'\uD835\uDD30'},'&sfrown;':{'codepoints':[8994],'characters':'\u2322'},'&sharp;':{'codepoints':[9839],'characters':'\u266F'},'&shchcy;':{'codepoints':[1097],'characters':'\u0449'},'&shcy;':{'codepoints':[1096],'characters':'\u0448'},'&shortmid;':{'codepoints':[8739],'characters':'\u2223'},'&shortparallel;':{'codepoints':[8741],'characters':'\u2225'},'&shy':{'codepoints':[173],'characters':'\xAD'},'&shy;':{'codepoints':[173],'characters':'\xAD'},'&sigma;':{'codepoints':[963],'characters':'\u03C3'},'&sigmaf;':{'codepoints':[962],'characters':'\u03C2'},'&sigmav;':{'codepoints':[962],'characters':'\u03C2'},'&sim;':{'codepoints':[8764],'characters':'\u223C'},'&simdot;':{'codepoints':[10858],'characters':'\u2A6A'},'&sime;':{'codepoints':[8771],'characters':'\u2243'},'&simeq;':{'codepoints':[8771],'characters':'\u2243'},'&simg;':{'codepoints':[10910],'characters':'\u2A9E'},'&simgE;':{'codepoints':[10912],'characters':'\u2AA0'},'&siml;':{'codepoints':[10909],'characters':'\u2A9D'},'&simlE;':{'codepoints':[10911],'characters':'\u2A9F'},'&simne;':{'codepoints':[8774],'characters':'\u2246'},'&simplus;':{'codepoints':[10788],'characters':'\u2A24'},'&simrarr;':{'codepoints':[10610],'characters':'\u2972'},'&slarr;':{'codepoints':[8592],'characters':'\u2190'},'&smallsetminus;':{'codepoints':[8726],'characters':'\u2216'},'&smashp;':{'codepoints':[10803],'characters':'\u2A33'},'&smeparsl;':{'codepoints':[10724],'characters':'\u29E4'},'&smid;':{'codepoints':[8739],'characters':'\u2223'},'&smile;':{'codepoints':[8995],'characters':'\u2323'},'&smt;':{'codepoints':[10922],'characters':'\u2AAA'},'&smte;':{'codepoints':[10924],'characters':'\u2AAC'},'&smtes;':{'codepoints':[10924,65024],'characters':'\u2AAC\uFE00'},'&softcy;':{'codepoints':[1100],'characters':'\u044C'},'&sol;':{'codepoints':[47],'characters':'/'},'&solb;':{'codepoints':[10692],'characters':'\u29C4'},'&solbar;':{'codepoints':[9023],'characters':'\u233F'},'&sopf;':{'codepoints':[120164],'characters':'\uD835\uDD64'},'&spades;':{'codepoints':[9824],'characters':'\u2660'},'&spadesuit;':{'codepoints':[9824],'characters':'\u2660'},'&spar;':{'codepoints':[8741],'characters':'\u2225'},'&sqcap;':{'codepoints':[8851],'characters':'\u2293'},'&sqcaps;':{'codepoints':[8851,65024],'characters':'\u2293\uFE00'},'&sqcup;':{'codepoints':[8852],'characters':'\u2294'},'&sqcups;':{'codepoints':[8852,65024],'characters':'\u2294\uFE00'},'&sqsub;':{'codepoints':[8847],'characters':'\u228F'},'&sqsube;':{'codepoints':[8849],'characters':'\u2291'},'&sqsubset;':{'codepoints':[8847],'characters':'\u228F'},'&sqsubseteq;':{'codepoints':[8849],'characters':'\u2291'},'&sqsup;':{'codepoints':[8848],'characters':'\u2290'},'&sqsupe;':{'codepoints':[8850],'characters':'\u2292'},'&sqsupset;':{'codepoints':[8848],'characters':'\u2290'},'&sqsupseteq;':{'codepoints':[8850],'characters':'\u2292'},'&squ;':{'codepoints':[9633],'characters':'\u25A1'},'&square;':{'codepoints':[9633],'characters':'\u25A1'},'&squarf;':{'codepoints':[9642],'characters':'\u25AA'},'&squf;':{'codepoints':[9642],'characters':'\u25AA'},'&srarr;':{'codepoints':[8594],'characters':'\u2192'},'&sscr;':{'codepoints':[120008],'characters':'\uD835\uDCC8'},'&ssetmn;':{'codepoints':[8726],'characters':'\u2216'},'&ssmile;':{'codepoints':[8995],'characters':'\u2323'},'&sstarf;':{'codepoints':[8902],'characters':'\u22C6'},'&star;':{'codepoints':[9734],'characters':'\u2606'},'&starf;':{'codepoints':[9733],'characters':'\u2605'},'&straightepsilon;':{'codepoints':[1013],'characters':'\u03F5'},'&straightphi;':{'codepoints':[981],'characters':'\u03D5'},'&strns;':{'codepoints':[175],'characters':'\xAF'},'&sub;':{'codepoints':[8834],'characters':'\u2282'},'&subE;':{'codepoints':[10949],'characters':'\u2AC5'},'&subdot;':{'codepoints':[10941],'characters':'\u2ABD'},'&sube;':{'codepoints':[8838],'characters':'\u2286'},'&subedot;':{'codepoints':[10947],'characters':'\u2AC3'},'&submult;':{'codepoints':[10945],'characters':'\u2AC1'},'&subnE;':{'codepoints':[10955],'characters':'\u2ACB'},'&subne;':{'codepoints':[8842],'characters':'\u228A'},'&subplus;':{'codepoints':[10943],'characters':'\u2ABF'},'&subrarr;':{'codepoints':[10617],'characters':'\u2979'},'&subset;':{'codepoints':[8834],'characters':'\u2282'},'&subseteq;':{'codepoints':[8838],'characters':'\u2286'},'&subseteqq;':{'codepoints':[10949],'characters':'\u2AC5'},'&subsetneq;':{'codepoints':[8842],'characters':'\u228A'},'&subsetneqq;':{'codepoints':[10955],'characters':'\u2ACB'},'&subsim;':{'codepoints':[10951],'characters':'\u2AC7'},'&subsub;':{'codepoints':[10965],'characters':'\u2AD5'},'&subsup;':{'codepoints':[10963],'characters':'\u2AD3'},'&succ;':{'codepoints':[8827],'characters':'\u227B'},'&succapprox;':{'codepoints':[10936],'characters':'\u2AB8'},'&succcurlyeq;':{'codepoints':[8829],'characters':'\u227D'},'&succeq;':{'codepoints':[10928],'characters':'\u2AB0'},'&succnapprox;':{'codepoints':[10938],'characters':'\u2ABA'},'&succneqq;':{'codepoints':[10934],'characters':'\u2AB6'},'&succnsim;':{'codepoints':[8937],'characters':'\u22E9'},'&succsim;':{'codepoints':[8831],'characters':'\u227F'},'&sum;':{'codepoints':[8721],'characters':'\u2211'},'&sung;':{'codepoints':[9834],'characters':'\u266A'},'&sup1':{'codepoints':[185],'characters':'\xB9'},'&sup1;':{'codepoints':[185],'characters':'\xB9'},'&sup2':{'codepoints':[178],'characters':'\xB2'},'&sup2;':{'codepoints':[178],'characters':'\xB2'},'&sup3':{'codepoints':[179],'characters':'\xB3'},'&sup3;':{'codepoints':[179],'characters':'\xB3'},'&sup;':{'codepoints':[8835],'characters':'\u2283'},'&supE;':{'codepoints':[10950],'characters':'\u2AC6'},'&supdot;':{'codepoints':[10942],'characters':'\u2ABE'},'&supdsub;':{'codepoints':[10968],'characters':'\u2AD8'},'&supe;':{'codepoints':[8839],'characters':'\u2287'},'&supedot;':{'codepoints':[10948],'characters':'\u2AC4'},'&suphsol;':{'codepoints':[10185],'characters':'\u27C9'},'&suphsub;':{'codepoints':[10967],'characters':'\u2AD7'},'&suplarr;':{'codepoints':[10619],'characters':'\u297B'},'&supmult;':{'codepoints':[10946],'characters':'\u2AC2'},'&supnE;':{'codepoints':[10956],'characters':'\u2ACC'},'&supne;':{'codepoints':[8843],'characters':'\u228B'},'&supplus;':{'codepoints':[10944],'characters':'\u2AC0'},'&supset;':{'codepoints':[8835],'characters':'\u2283'},'&supseteq;':{'codepoints':[8839],'characters':'\u2287'},'&supseteqq;':{'codepoints':[10950],'characters':'\u2AC6'},'&supsetneq;':{'codepoints':[8843],'characters':'\u228B'},'&supsetneqq;':{'codepoints':[10956],'characters':'\u2ACC'},'&supsim;':{'codepoints':[10952],'characters':'\u2AC8'},'&supsub;':{'codepoints':[10964],'characters':'\u2AD4'},'&supsup;':{'codepoints':[10966],'characters':'\u2AD6'},'&swArr;':{'codepoints':[8665],'characters':'\u21D9'},'&swarhk;':{'codepoints':[10534],'characters':'\u2926'},'&swarr;':{'codepoints':[8601],'characters':'\u2199'},'&swarrow;':{'codepoints':[8601],'characters':'\u2199'},'&swnwar;':{'codepoints':[10538],'characters':'\u292A'},'&szlig':{'codepoints':[223],'characters':'\xDF'},'&szlig;':{'codepoints':[223],'characters':'\xDF'},'&target;':{'codepoints':[8982],'characters':'\u2316'},'&tau;':{'codepoints':[964],'characters':'\u03C4'},'&tbrk;':{'codepoints':[9140],'characters':'\u23B4'},'&tcaron;':{'codepoints':[357],'characters':'\u0165'},'&tcedil;':{'codepoints':[355],'characters':'\u0163'},'&tcy;':{'codepoints':[1090],'characters':'\u0442'},'&tdot;':{'codepoints':[8411],'characters':'\u20DB'},'&telrec;':{'codepoints':[8981],'characters':'\u2315'},'&tfr;':{'codepoints':[120113],'characters':'\uD835\uDD31'},'&there4;':{'codepoints':[8756],'characters':'\u2234'},'&therefore;':{'codepoints':[8756],'characters':'\u2234'},'&theta;':{'codepoints':[952],'characters':'\u03B8'},'&thetasym;':{'codepoints':[977],'characters':'\u03D1'},'&thetav;':{'codepoints':[977],'characters':'\u03D1'},'&thickapprox;':{'codepoints':[8776],'characters':'\u2248'},'&thicksim;':{'codepoints':[8764],'characters':'\u223C'},'&thinsp;':{'codepoints':[8201],'characters':'\u2009'},'&thkap;':{'codepoints':[8776],'characters':'\u2248'},'&thksim;':{'codepoints':[8764],'characters':'\u223C'},'&thorn':{'codepoints':[254],'characters':'\xFE'},'&thorn;':{'codepoints':[254],'characters':'\xFE'},'&tilde;':{'codepoints':[732],'characters':'\u02DC'},'&times':{'codepoints':[215],'characters':'\xD7'},'&times;':{'codepoints':[215],'characters':'\xD7'},'&timesb;':{'codepoints':[8864],'characters':'\u22A0'},'&timesbar;':{'codepoints':[10801],'characters':'\u2A31'},'&timesd;':{'codepoints':[10800],'characters':'\u2A30'},'&tint;':{'codepoints':[8749],'characters':'\u222D'},'&toea;':{'codepoints':[10536],'characters':'\u2928'},'&top;':{'codepoints':[8868],'characters':'\u22A4'},'&topbot;':{'codepoints':[9014],'characters':'\u2336'},'&topcir;':{'codepoints':[10993],'characters':'\u2AF1'},'&topf;':{'codepoints':[120165],'characters':'\uD835\uDD65'},'&topfork;':{'codepoints':[10970],'characters':'\u2ADA'},'&tosa;':{'codepoints':[10537],'characters':'\u2929'},'&tprime;':{'codepoints':[8244],'characters':'\u2034'},'&trade;':{'codepoints':[8482],'characters':'\u2122'},'&triangle;':{'codepoints':[9653],'characters':'\u25B5'},'&triangledown;':{'codepoints':[9663],'characters':'\u25BF'},'&triangleleft;':{'codepoints':[9667],'characters':'\u25C3'},'&trianglelefteq;':{'codepoints':[8884],'characters':'\u22B4'},'&triangleq;':{'codepoints':[8796],'characters':'\u225C'},'&triangleright;':{'codepoints':[9657],'characters':'\u25B9'},'&trianglerighteq;':{'codepoints':[8885],'characters':'\u22B5'},'&tridot;':{'codepoints':[9708],'characters':'\u25EC'},'&trie;':{'codepoints':[8796],'characters':'\u225C'},'&triminus;':{'codepoints':[10810],'characters':'\u2A3A'},'&triplus;':{'codepoints':[10809],'characters':'\u2A39'},'&trisb;':{'codepoints':[10701],'characters':'\u29CD'},'&tritime;':{'codepoints':[10811],'characters':'\u2A3B'},'&trpezium;':{'codepoints':[9186],'characters':'\u23E2'},'&tscr;':{'codepoints':[120009],'characters':'\uD835\uDCC9'},'&tscy;':{'codepoints':[1094],'characters':'\u0446'},'&tshcy;':{'codepoints':[1115],'characters':'\u045B'},'&tstrok;':{'codepoints':[359],'characters':'\u0167'},'&twixt;':{'codepoints':[8812],'characters':'\u226C'},'&twoheadleftarrow;':{'codepoints':[8606],'characters':'\u219E'},'&twoheadrightarrow;':{'codepoints':[8608],'characters':'\u21A0'},'&uArr;':{'codepoints':[8657],'characters':'\u21D1'},'&uHar;':{'codepoints':[10595],'characters':'\u2963'},'&uacute':{'codepoints':[250],'characters':'\xFA'},'&uacute;':{'codepoints':[250],'characters':'\xFA'},'&uarr;':{'codepoints':[8593],'characters':'\u2191'},'&ubrcy;':{'codepoints':[1118],'characters':'\u045E'},'&ubreve;':{'codepoints':[365],'characters':'\u016D'},'&ucirc':{'codepoints':[251],'characters':'\xFB'},'&ucirc;':{'codepoints':[251],'characters':'\xFB'},'&ucy;':{'codepoints':[1091],'characters':'\u0443'},'&udarr;':{'codepoints':[8645],'characters':'\u21C5'},'&udblac;':{'codepoints':[369],'characters':'\u0171'},'&udhar;':{'codepoints':[10606],'characters':'\u296E'},'&ufisht;':{'codepoints':[10622],'characters':'\u297E'},'&ufr;':{'codepoints':[120114],'characters':'\uD835\uDD32'},'&ugrave':{'codepoints':[249],'characters':'\xF9'},'&ugrave;':{'codepoints':[249],'characters':'\xF9'},'&uharl;':{'codepoints':[8639],'characters':'\u21BF'},'&uharr;':{'codepoints':[8638],'characters':'\u21BE'},'&uhblk;':{'codepoints':[9600],'characters':'\u2580'},'&ulcorn;':{'codepoints':[8988],'characters':'\u231C'},'&ulcorner;':{'codepoints':[8988],'characters':'\u231C'},'&ulcrop;':{'codepoints':[8975],'characters':'\u230F'},'&ultri;':{'codepoints':[9720],'characters':'\u25F8'},'&umacr;':{'codepoints':[363],'characters':'\u016B'},'&uml':{'codepoints':[168],'characters':'\xA8'},'&uml;':{'codepoints':[168],'characters':'\xA8'},'&uogon;':{'codepoints':[371],'characters':'\u0173'},'&uopf;':{'codepoints':[120166],'characters':'\uD835\uDD66'},'&uparrow;':{'codepoints':[8593],'characters':'\u2191'},'&updownarrow;':{'codepoints':[8597],'characters':'\u2195'},'&upharpoonleft;':{'codepoints':[8639],'characters':'\u21BF'},'&upharpoonright;':{'codepoints':[8638],'characters':'\u21BE'},'&uplus;':{'codepoints':[8846],'characters':'\u228E'},'&upsi;':{'codepoints':[965],'characters':'\u03C5'},'&upsih;':{'codepoints':[978],'characters':'\u03D2'},'&upsilon;':{'codepoints':[965],'characters':'\u03C5'},'&upuparrows;':{'codepoints':[8648],'characters':'\u21C8'},'&urcorn;':{'codepoints':[8989],'characters':'\u231D'},'&urcorner;':{'codepoints':[8989],'characters':'\u231D'},'&urcrop;':{'codepoints':[8974],'characters':'\u230E'},'&uring;':{'codepoints':[367],'characters':'\u016F'},'&urtri;':{'codepoints':[9721],'characters':'\u25F9'},'&uscr;':{'codepoints':[120010],'characters':'\uD835\uDCCA'},'&utdot;':{'codepoints':[8944],'characters':'\u22F0'},'&utilde;':{'codepoints':[361],'characters':'\u0169'},'&utri;':{'codepoints':[9653],'characters':'\u25B5'},'&utrif;':{'codepoints':[9652],'characters':'\u25B4'},'&uuarr;':{'codepoints':[8648],'characters':'\u21C8'},'&uuml':{'codepoints':[252],'characters':'\xFC'},'&uuml;':{'codepoints':[252],'characters':'\xFC'},'&uwangle;':{'codepoints':[10663],'characters':'\u29A7'},'&vArr;':{'codepoints':[8661],'characters':'\u21D5'},'&vBar;':{'codepoints':[10984],'characters':'\u2AE8'},'&vBarv;':{'codepoints':[10985],'characters':'\u2AE9'},'&vDash;':{'codepoints':[8872],'characters':'\u22A8'},'&vangrt;':{'codepoints':[10652],'characters':'\u299C'},'&varepsilon;':{'codepoints':[1013],'characters':'\u03F5'},'&varkappa;':{'codepoints':[1008],'characters':'\u03F0'},'&varnothing;':{'codepoints':[8709],'characters':'\u2205'},'&varphi;':{'codepoints':[981],'characters':'\u03D5'},'&varpi;':{'codepoints':[982],'characters':'\u03D6'},'&varpropto;':{'codepoints':[8733],'characters':'\u221D'},'&varr;':{'codepoints':[8597],'characters':'\u2195'},'&varrho;':{'codepoints':[1009],'characters':'\u03F1'},'&varsigma;':{'codepoints':[962],'characters':'\u03C2'},'&varsubsetneq;':{'codepoints':[8842,65024],'characters':'\u228A\uFE00'},'&varsubsetneqq;':{'codepoints':[10955,65024],'characters':'\u2ACB\uFE00'},'&varsupsetneq;':{'codepoints':[8843,65024],'characters':'\u228B\uFE00'},'&varsupsetneqq;':{'codepoints':[10956,65024],'characters':'\u2ACC\uFE00'},'&vartheta;':{'codepoints':[977],'characters':'\u03D1'},'&vartriangleleft;':{'codepoints':[8882],'characters':'\u22B2'},'&vartriangleright;':{'codepoints':[8883],'characters':'\u22B3'},'&vcy;':{'codepoints':[1074],'characters':'\u0432'},'&vdash;':{'codepoints':[8866],'characters':'\u22A2'},'&vee;':{'codepoints':[8744],'characters':'\u2228'},'&veebar;':{'codepoints':[8891],'characters':'\u22BB'},'&veeeq;':{'codepoints':[8794],'characters':'\u225A'},'&vellip;':{'codepoints':[8942],'characters':'\u22EE'},'&verbar;':{'codepoints':[124],'characters':'|'},'&vert;':{'codepoints':[124],'characters':'|'},'&vfr;':{'codepoints':[120115],'characters':'\uD835\uDD33'},'&vltri;':{'codepoints':[8882],'characters':'\u22B2'},'&vnsub;':{'codepoints':[8834,8402],'characters':'\u2282\u20D2'},'&vnsup;':{'codepoints':[8835,8402],'characters':'\u2283\u20D2'},'&vopf;':{'codepoints':[120167],'characters':'\uD835\uDD67'},'&vprop;':{'codepoints':[8733],'characters':'\u221D'},'&vrtri;':{'codepoints':[8883],'characters':'\u22B3'},'&vscr;':{'codepoints':[120011],'characters':'\uD835\uDCCB'},'&vsubnE;':{'codepoints':[10955,65024],'characters':'\u2ACB\uFE00'},'&vsubne;':{'codepoints':[8842,65024],'characters':'\u228A\uFE00'},'&vsupnE;':{'codepoints':[10956,65024],'characters':'\u2ACC\uFE00'},'&vsupne;':{'codepoints':[8843,65024],'characters':'\u228B\uFE00'},'&vzigzag;':{'codepoints':[10650],'characters':'\u299A'},'&wcirc;':{'codepoints':[373],'characters':'\u0175'},'&wedbar;':{'codepoints':[10847],'characters':'\u2A5F'},'&wedge;':{'codepoints':[8743],'characters':'\u2227'},'&wedgeq;':{'codepoints':[8793],'characters':'\u2259'},'&weierp;':{'codepoints':[8472],'characters':'\u2118'},'&wfr;':{'codepoints':[120116],'characters':'\uD835\uDD34'},'&wopf;':{'codepoints':[120168],'characters':'\uD835\uDD68'},'&wp;':{'codepoints':[8472],'characters':'\u2118'},'&wr;':{'codepoints':[8768],'characters':'\u2240'},'&wreath;':{'codepoints':[8768],'characters':'\u2240'},'&wscr;':{'codepoints':[120012],'characters':'\uD835\uDCCC'},'&xcap;':{'codepoints':[8898],'characters':'\u22C2'},'&xcirc;':{'codepoints':[9711],'characters':'\u25EF'},'&xcup;':{'codepoints':[8899],'characters':'\u22C3'},'&xdtri;':{'codepoints':[9661],'characters':'\u25BD'},'&xfr;':{'codepoints':[120117],'characters':'\uD835\uDD35'},'&xhArr;':{'codepoints':[10234],'characters':'\u27FA'},'&xharr;':{'codepoints':[10231],'characters':'\u27F7'},'&xi;':{'codepoints':[958],'characters':'\u03BE'},'&xlArr;':{'codepoints':[10232],'characters':'\u27F8'},'&xlarr;':{'codepoints':[10229],'characters':'\u27F5'},'&xmap;':{'codepoints':[10236],'characters':'\u27FC'},'&xnis;':{'codepoints':[8955],'characters':'\u22FB'},'&xodot;':{'codepoints':[10752],'characters':'\u2A00'},'&xopf;':{'codepoints':[120169],'characters':'\uD835\uDD69'},'&xoplus;':{'codepoints':[10753],'characters':'\u2A01'},'&xotime;':{'codepoints':[10754],'characters':'\u2A02'},'&xrArr;':{'codepoints':[10233],'characters':'\u27F9'},'&xrarr;':{'codepoints':[10230],'characters':'\u27F6'},'&xscr;':{'codepoints':[120013],'characters':'\uD835\uDCCD'},'&xsqcup;':{'codepoints':[10758],'characters':'\u2A06'},'&xuplus;':{'codepoints':[10756],'characters':'\u2A04'},'&xutri;':{'codepoints':[9651],'characters':'\u25B3'},'&xvee;':{'codepoints':[8897],'characters':'\u22C1'},'&xwedge;':{'codepoints':[8896],'characters':'\u22C0'},'&yacute':{'codepoints':[253],'characters':'\xFD'},'&yacute;':{'codepoints':[253],'characters':'\xFD'},'&yacy;':{'codepoints':[1103],'characters':'\u044F'},'&ycirc;':{'codepoints':[375],'characters':'\u0177'},'&ycy;':{'codepoints':[1099],'characters':'\u044B'},'&yen':{'codepoints':[165],'characters':'\xA5'},'&yen;':{'codepoints':[165],'characters':'\xA5'},'&yfr;':{'codepoints':[120118],'characters':'\uD835\uDD36'},'&yicy;':{'codepoints':[1111],'characters':'\u0457'},'&yopf;':{'codepoints':[120170],'characters':'\uD835\uDD6A'},'&yscr;':{'codepoints':[120014],'characters':'\uD835\uDCCE'},'&yucy;':{'codepoints':[1102],'characters':'\u044E'},'&yuml':{'codepoints':[255],'characters':'\xFF'},'&yuml;':{'codepoints':[255],'characters':'\xFF'},'&zacute;':{'codepoints':[378],'characters':'\u017A'},'&zcaron;':{'codepoints':[382],'characters':'\u017E'},'&zcy;':{'codepoints':[1079],'characters':'\u0437'},'&zdot;':{'codepoints':[380],'characters':'\u017C'},'&zeetrf;':{'codepoints':[8488],'characters':'\u2128'},'&zeta;':{'codepoints':[950],'characters':'\u03B6'},'&zfr;':{'codepoints':[120119],'characters':'\uD835\uDD37'},'&zhcy;':{'codepoints':[1078],'characters':'\u0436'},'&zigrarr;':{'codepoints':[8669],'characters':'\u21DD'},'&zopf;':{'codepoints':[120171],'characters':'\uD835\uDD6B'},'&zscr;':{'codepoints':[120015],'characters':'\uD835\uDCCF'},'&zwj;':{'codepoints':[8205],'characters':'\u200D'},'&zwnj;':{'codepoints':[8204],'characters':'\u200C'}};
	var encodeData = [
		{
			'decoded': 'a\xC1b',
			'encoded': 'a&Aacute;b'
		},
		{
			'decoded': 'a\xE1b',
			'encoded': 'a&aacute;b'
		},
		{
			'decoded': 'a\u0102b',
			'encoded': 'a&Abreve;b'
		},
		{
			'decoded': 'a\u0103b',
			'encoded': 'a&abreve;b'
		},
		{
			'decoded': 'a\u223Eb',
			'encoded': 'a&ac;b'
		},
		{
			'decoded': 'a\u223Fb',
			'encoded': 'a&acd;b'
		},
		{
			'decoded': 'a\u223E\u0333b',
			'encoded': 'a&acE;b'
		},
		{
			'decoded': 'a\xC2b',
			'encoded': 'a&Acirc;b'
		},
		{
			'decoded': 'a\xE2b',
			'encoded': 'a&acirc;b'
		},
		{
			'decoded': 'a\xB4b',
			'encoded': 'a&acute;b'
		},
		{
			'decoded': 'a\u0410b',
			'encoded': 'a&Acy;b'
		},
		{
			'decoded': 'a\u0430b',
			'encoded': 'a&acy;b'
		},
		{
			'decoded': 'a\xC6b',
			'encoded': 'a&AElig;b'
		},
		{
			'decoded': 'a\xE6b',
			'encoded': 'a&aelig;b'
		},
		{
			'decoded': 'a\u2061b',
			'encoded': 'a&af;b'
		},
		{
			'decoded': 'a\uD835\uDD04b',
			'encoded': 'a&Afr;b'
		},
		{
			'decoded': 'a\uD835\uDD1Eb',
			'encoded': 'a&afr;b'
		},
		{
			'decoded': 'a\xC0b',
			'encoded': 'a&Agrave;b'
		},
		{
			'decoded': 'a\xE0b',
			'encoded': 'a&agrave;b'
		},
		{
			'decoded': 'a\u2135b',
			'encoded': 'a&aleph;b'
		},
		{
			'decoded': 'a\u0391b',
			'encoded': 'a&Alpha;b'
		},
		{
			'decoded': 'a\u03B1b',
			'encoded': 'a&alpha;b'
		},
		{
			'decoded': 'a\u0100b',
			'encoded': 'a&Amacr;b'
		},
		{
			'decoded': 'a\u0101b',
			'encoded': 'a&amacr;b'
		},
		{
			'decoded': 'a\u2A3Fb',
			'encoded': 'a&amalg;b'
		},
		{
			'decoded': 'a&b',
			'encoded': 'a&amp;b'
		},
		{
			'decoded': 'a\u2A55b',
			'encoded': 'a&andand;b'
		},
		{
			'decoded': 'a\u2A53b',
			'encoded': 'a&And;b'
		},
		{
			'decoded': 'a\u2227b',
			'encoded': 'a&and;b'
		},
		{
			'decoded': 'a\u2A5Cb',
			'encoded': 'a&andd;b'
		},
		{
			'decoded': 'a\u2A58b',
			'encoded': 'a&andslope;b'
		},
		{
			'decoded': 'a\u2A5Ab',
			'encoded': 'a&andv;b'
		},
		{
			'decoded': 'a\u2220b',
			'encoded': 'a&ang;b'
		},
		{
			'decoded': 'a\u29A4b',
			'encoded': 'a&ange;b'
		},
		{
			'decoded': 'a\u29A8b',
			'encoded': 'a&angmsdaa;b'
		},
		{
			'decoded': 'a\u29A9b',
			'encoded': 'a&angmsdab;b'
		},
		{
			'decoded': 'a\u29AAb',
			'encoded': 'a&angmsdac;b'
		},
		{
			'decoded': 'a\u29ABb',
			'encoded': 'a&angmsdad;b'
		},
		{
			'decoded': 'a\u29ACb',
			'encoded': 'a&angmsdae;b'
		},
		{
			'decoded': 'a\u29ADb',
			'encoded': 'a&angmsdaf;b'
		},
		{
			'decoded': 'a\u29AEb',
			'encoded': 'a&angmsdag;b'
		},
		{
			'decoded': 'a\u29AFb',
			'encoded': 'a&angmsdah;b'
		},
		{
			'decoded': 'a\u2221b',
			'encoded': 'a&angmsd;b'
		},
		{
			'decoded': 'a\u221Fb',
			'encoded': 'a&angrt;b'
		},
		{
			'decoded': 'a\u22BEb',
			'encoded': 'a&angrtvb;b'
		},
		{
			'decoded': 'a\u299Db',
			'encoded': 'a&angrtvbd;b'
		},
		{
			'decoded': 'a\u2222b',
			'encoded': 'a&angsph;b'
		},
		{
			'decoded': 'a\xC5b',
			'encoded': 'a&angst;b'
		},
		{
			'decoded': 'a\u237Cb',
			'encoded': 'a&angzarr;b'
		},
		{
			'decoded': 'a\u0104b',
			'encoded': 'a&Aogon;b'
		},
		{
			'decoded': 'a\u0105b',
			'encoded': 'a&aogon;b'
		},
		{
			'decoded': 'a\uD835\uDD38b',
			'encoded': 'a&Aopf;b'
		},
		{
			'decoded': 'a\uD835\uDD52b',
			'encoded': 'a&aopf;b'
		},
		{
			'decoded': 'a\u2A6Fb',
			'encoded': 'a&apacir;b'
		},
		{
			'decoded': 'a\u2248b',
			'encoded': 'a&ap;b'
		},
		{
			'decoded': 'a\u2A70b',
			'encoded': 'a&apE;b'
		},
		{
			'decoded': 'a\u224Ab',
			'encoded': 'a&ape;b'
		},
		{
			'decoded': 'a\u224Bb',
			'encoded': 'a&apid;b'
		},
		{
			'decoded': 'a\'b',
			'encoded': 'a&apos;b'
		},
		{
			'decoded': 'a\xE5b',
			'encoded': 'a&aring;b'
		},
		{
			'decoded': 'a\uD835\uDC9Cb',
			'encoded': 'a&Ascr;b'
		},
		{
			'decoded': 'a\uD835\uDCB6b',
			'encoded': 'a&ascr;b'
		},
		{
			'decoded': 'a\xC3b',
			'encoded': 'a&Atilde;b'
		},
		{
			'decoded': 'a\xE3b',
			'encoded': 'a&atilde;b'
		},
		{
			'decoded': 'a\xC4b',
			'encoded': 'a&Auml;b'
		},
		{
			'decoded': 'a\xE4b',
			'encoded': 'a&auml;b'
		},
		{
			'decoded': 'a\u2233b',
			'encoded': 'a&awconint;b'
		},
		{
			'decoded': 'a\u2A11b',
			'encoded': 'a&awint;b'
		},
		{
			'decoded': 'a\u2AE7b',
			'encoded': 'a&Barv;b'
		},
		{
			'decoded': 'a\u22BDb',
			'encoded': 'a&barvee;b'
		},
		{
			'decoded': 'a\u2305b',
			'encoded': 'a&barwed;b'
		},
		{
			'decoded': 'a\u2306b',
			'encoded': 'a&Barwed;b'
		},
		{
			'decoded': 'a\u23B5b',
			'encoded': 'a&bbrk;b'
		},
		{
			'decoded': 'a\u23B6b',
			'encoded': 'a&bbrktbrk;b'
		},
		{
			'decoded': 'a\u224Cb',
			'encoded': 'a&bcong;b'
		},
		{
			'decoded': 'a\u0411b',
			'encoded': 'a&Bcy;b'
		},
		{
			'decoded': 'a\u0431b',
			'encoded': 'a&bcy;b'
		},
		{
			'decoded': 'a\u201Eb',
			'encoded': 'a&bdquo;b'
		},
		{
			'decoded': 'a\u2235b',
			'encoded': 'a&becaus;b'
		},
		{
			'decoded': 'a\u29B0b',
			'encoded': 'a&bemptyv;b'
		},
		{
			'decoded': 'a\u03F6b',
			'encoded': 'a&bepsi;b'
		},
		{
			'decoded': 'a\u0392b',
			'encoded': 'a&Beta;b'
		},
		{
			'decoded': 'a\u03B2b',
			'encoded': 'a&beta;b'
		},
		{
			'decoded': 'a\u2136b',
			'encoded': 'a&beth;b'
		},
		{
			'decoded': 'a\uD835\uDD05b',
			'encoded': 'a&Bfr;b'
		},
		{
			'decoded': 'a\uD835\uDD1Fb',
			'encoded': 'a&bfr;b'
		},
		{
			'decoded': 'a\u2423b',
			'encoded': 'a&blank;b'
		},
		{
			'decoded': 'a\u2592b',
			'encoded': 'a&blk12;b'
		},
		{
			'decoded': 'a\u2591b',
			'encoded': 'a&blk14;b'
		},
		{
			'decoded': 'a\u2593b',
			'encoded': 'a&blk34;b'
		},
		{
			'decoded': 'a\u2588b',
			'encoded': 'a&block;b'
		},
		{
			'decoded': 'a=\u20E5b',
			'encoded': 'a&bne;b'
		},
		{
			'decoded': 'a\u2261\u20E5b',
			'encoded': 'a&bnequiv;b'
		},
		{
			'decoded': 'a\u2AEDb',
			'encoded': 'a&bNot;b'
		},
		{
			'decoded': 'a\u2310b',
			'encoded': 'a&bnot;b'
		},
		{
			'decoded': 'a\uD835\uDD39b',
			'encoded': 'a&Bopf;b'
		},
		{
			'decoded': 'a\uD835\uDD53b',
			'encoded': 'a&bopf;b'
		},
		{
			'decoded': 'a\u22A5b',
			'encoded': 'a&bot;b'
		},
		{
			'decoded': 'a\u22C8b',
			'encoded': 'a&bowtie;b'
		},
		{
			'decoded': 'a\u29C9b',
			'encoded': 'a&boxbox;b'
		},
		{
			'decoded': 'a\u2510b',
			'encoded': 'a&boxdl;b'
		},
		{
			'decoded': 'a\u2555b',
			'encoded': 'a&boxdL;b'
		},
		{
			'decoded': 'a\u2556b',
			'encoded': 'a&boxDl;b'
		},
		{
			'decoded': 'a\u2557b',
			'encoded': 'a&boxDL;b'
		},
		{
			'decoded': 'a\u250Cb',
			'encoded': 'a&boxdr;b'
		},
		{
			'decoded': 'a\u2552b',
			'encoded': 'a&boxdR;b'
		},
		{
			'decoded': 'a\u2553b',
			'encoded': 'a&boxDr;b'
		},
		{
			'decoded': 'a\u2554b',
			'encoded': 'a&boxDR;b'
		},
		{
			'decoded': 'a\u2500b',
			'encoded': 'a&boxh;b'
		},
		{
			'decoded': 'a\u2550b',
			'encoded': 'a&boxH;b'
		},
		{
			'decoded': 'a\u252Cb',
			'encoded': 'a&boxhd;b'
		},
		{
			'decoded': 'a\u2564b',
			'encoded': 'a&boxHd;b'
		},
		{
			'decoded': 'a\u2565b',
			'encoded': 'a&boxhD;b'
		},
		{
			'decoded': 'a\u2566b',
			'encoded': 'a&boxHD;b'
		},
		{
			'decoded': 'a\u2534b',
			'encoded': 'a&boxhu;b'
		},
		{
			'decoded': 'a\u2567b',
			'encoded': 'a&boxHu;b'
		},
		{
			'decoded': 'a\u2568b',
			'encoded': 'a&boxhU;b'
		},
		{
			'decoded': 'a\u2569b',
			'encoded': 'a&boxHU;b'
		},
		{
			'decoded': 'a\u2518b',
			'encoded': 'a&boxul;b'
		},
		{
			'decoded': 'a\u255Bb',
			'encoded': 'a&boxuL;b'
		},
		{
			'decoded': 'a\u255Cb',
			'encoded': 'a&boxUl;b'
		},
		{
			'decoded': 'a\u255Db',
			'encoded': 'a&boxUL;b'
		},
		{
			'decoded': 'a\u2514b',
			'encoded': 'a&boxur;b'
		},
		{
			'decoded': 'a\u2558b',
			'encoded': 'a&boxuR;b'
		},
		{
			'decoded': 'a\u2559b',
			'encoded': 'a&boxUr;b'
		},
		{
			'decoded': 'a\u255Ab',
			'encoded': 'a&boxUR;b'
		},
		{
			'decoded': 'a\u2502b',
			'encoded': 'a&boxv;b'
		},
		{
			'decoded': 'a\u2551b',
			'encoded': 'a&boxV;b'
		},
		{
			'decoded': 'a\u253Cb',
			'encoded': 'a&boxvh;b'
		},
		{
			'decoded': 'a\u256Ab',
			'encoded': 'a&boxvH;b'
		},
		{
			'decoded': 'a\u256Bb',
			'encoded': 'a&boxVh;b'
		},
		{
			'decoded': 'a\u256Cb',
			'encoded': 'a&boxVH;b'
		},
		{
			'decoded': 'a\u2524b',
			'encoded': 'a&boxvl;b'
		},
		{
			'decoded': 'a\u2561b',
			'encoded': 'a&boxvL;b'
		},
		{
			'decoded': 'a\u2562b',
			'encoded': 'a&boxVl;b'
		},
		{
			'decoded': 'a\u2563b',
			'encoded': 'a&boxVL;b'
		},
		{
			'decoded': 'a\u251Cb',
			'encoded': 'a&boxvr;b'
		},
		{
			'decoded': 'a\u255Eb',
			'encoded': 'a&boxvR;b'
		},
		{
			'decoded': 'a\u255Fb',
			'encoded': 'a&boxVr;b'
		},
		{
			'decoded': 'a\u2560b',
			'encoded': 'a&boxVR;b'
		},
		{
			'decoded': 'a\u2035b',
			'encoded': 'a&bprime;b'
		},
		{
			'decoded': 'a\u02D8b',
			'encoded': 'a&breve;b'
		},
		{
			'decoded': 'a\xA6b',
			'encoded': 'a&brvbar;b'
		},
		{
			'decoded': 'a\uD835\uDCB7b',
			'encoded': 'a&bscr;b'
		},
		{
			'decoded': 'a\u212Cb',
			'encoded': 'a&Bscr;b'
		},
		{
			'decoded': 'a\u204Fb',
			'encoded': 'a&bsemi;b'
		},
		{
			'decoded': 'a\u223Db',
			'encoded': 'a&bsim;b'
		},
		{
			'decoded': 'a\u22CDb',
			'encoded': 'a&bsime;b'
		},
		{
			'decoded': 'a\u29C5b',
			'encoded': 'a&bsolb;b'
		},
		{
			'decoded': 'a\u27C8b',
			'encoded': 'a&bsolhsub;b'
		},
		{
			'decoded': 'a\u2022b',
			'encoded': 'a&bull;b'
		},
		{
			'decoded': 'a\u224Eb',
			'encoded': 'a&bump;b'
		},
		{
			'decoded': 'a\u2AAEb',
			'encoded': 'a&bumpE;b'
		},
		{
			'decoded': 'a\u224Fb',
			'encoded': 'a&bumpe;b'
		},
		{
			'decoded': 'a\u0106b',
			'encoded': 'a&Cacute;b'
		},
		{
			'decoded': 'a\u0107b',
			'encoded': 'a&cacute;b'
		},
		{
			'decoded': 'a\u2A44b',
			'encoded': 'a&capand;b'
		},
		{
			'decoded': 'a\u2A49b',
			'encoded': 'a&capbrcup;b'
		},
		{
			'decoded': 'a\u2A4Bb',
			'encoded': 'a&capcap;b'
		},
		{
			'decoded': 'a\u2229b',
			'encoded': 'a&cap;b'
		},
		{
			'decoded': 'a\u22D2b',
			'encoded': 'a&Cap;b'
		},
		{
			'decoded': 'a\u2A47b',
			'encoded': 'a&capcup;b'
		},
		{
			'decoded': 'a\u2A40b',
			'encoded': 'a&capdot;b'
		},
		{
			'decoded': 'a\u2229\uFE00b',
			'encoded': 'a&caps;b'
		},
		{
			'decoded': 'a\u2041b',
			'encoded': 'a&caret;b'
		},
		{
			'decoded': 'a\u02C7b',
			'encoded': 'a&caron;b'
		},
		{
			'decoded': 'a\u2A4Db',
			'encoded': 'a&ccaps;b'
		},
		{
			'decoded': 'a\u010Cb',
			'encoded': 'a&Ccaron;b'
		},
		{
			'decoded': 'a\u010Db',
			'encoded': 'a&ccaron;b'
		},
		{
			'decoded': 'a\xC7b',
			'encoded': 'a&Ccedil;b'
		},
		{
			'decoded': 'a\xE7b',
			'encoded': 'a&ccedil;b'
		},
		{
			'decoded': 'a\u0108b',
			'encoded': 'a&Ccirc;b'
		},
		{
			'decoded': 'a\u0109b',
			'encoded': 'a&ccirc;b'
		},
		{
			'decoded': 'a\u2230b',
			'encoded': 'a&Cconint;b'
		},
		{
			'decoded': 'a\u2A4Cb',
			'encoded': 'a&ccups;b'
		},
		{
			'decoded': 'a\u2A50b',
			'encoded': 'a&ccupssm;b'
		},
		{
			'decoded': 'a\u010Ab',
			'encoded': 'a&Cdot;b'
		},
		{
			'decoded': 'a\u010Bb',
			'encoded': 'a&cdot;b'
		},
		{
			'decoded': 'a\xB8b',
			'encoded': 'a&cedil;b'
		},
		{
			'decoded': 'a\u29B2b',
			'encoded': 'a&cemptyv;b'
		},
		{
			'decoded': 'a\xA2b',
			'encoded': 'a&cent;b'
		},
		{
			'decoded': 'a\uD835\uDD20b',
			'encoded': 'a&cfr;b'
		},
		{
			'decoded': 'a\u212Db',
			'encoded': 'a&Cfr;b'
		},
		{
			'decoded': 'a\u0427b',
			'encoded': 'a&CHcy;b'
		},
		{
			'decoded': 'a\u0447b',
			'encoded': 'a&chcy;b'
		},
		{
			'decoded': 'a\u2713b',
			'encoded': 'a&check;b'
		},
		{
			'decoded': 'a\u03A7b',
			'encoded': 'a&Chi;b'
		},
		{
			'decoded': 'a\u03C7b',
			'encoded': 'a&chi;b'
		},
		{
			'decoded': 'a\u02C6b',
			'encoded': 'a&circ;b'
		},
		{
			'decoded': 'a\u25CBb',
			'encoded': 'a&cir;b'
		},
		{
			'decoded': 'a\u29C3b',
			'encoded': 'a&cirE;b'
		},
		{
			'decoded': 'a\u2257b',
			'encoded': 'a&cire;b'
		},
		{
			'decoded': 'a\u2A10b',
			'encoded': 'a&cirfnint;b'
		},
		{
			'decoded': 'a\u2AEFb',
			'encoded': 'a&cirmid;b'
		},
		{
			'decoded': 'a\u29C2b',
			'encoded': 'a&cirscir;b'
		},
		{
			'decoded': 'a\u2663b',
			'encoded': 'a&clubs;b'
		},
		{
			'decoded': 'a\u2237b',
			'encoded': 'a&Colon;b'
		},
		{
			'decoded': 'a\u2A74b',
			'encoded': 'a&Colone;b'
		},
		{
			'decoded': 'a\u2254b',
			'encoded': 'a&colone;b'
		},
		{
			'decoded': 'a\u2201b',
			'encoded': 'a&comp;b'
		},
		{
			'decoded': 'a\u2218b',
			'encoded': 'a&compfn;b'
		},
		{
			'decoded': 'a\u2245b',
			'encoded': 'a&cong;b'
		},
		{
			'decoded': 'a\u2A6Db',
			'encoded': 'a&congdot;b'
		},
		{
			'decoded': 'a\u222Fb',
			'encoded': 'a&Conint;b'
		},
		{
			'decoded': 'a\uD835\uDD54b',
			'encoded': 'a&copf;b'
		},
		{
			'decoded': 'a\u2102b',
			'encoded': 'a&Copf;b'
		},
		{
			'decoded': 'a\u2210b',
			'encoded': 'a&coprod;b'
		},
		{
			'decoded': 'a\xA9b',
			'encoded': 'a&copy;b'
		},
		{
			'decoded': 'a\u2117b',
			'encoded': 'a&copysr;b'
		},
		{
			'decoded': 'a\u21B5b',
			'encoded': 'a&crarr;b'
		},
		{
			'decoded': 'a\u2717b',
			'encoded': 'a&cross;b'
		},
		{
			'decoded': 'a\u2A2Fb',
			'encoded': 'a&Cross;b'
		},
		{
			'decoded': 'a\uD835\uDC9Eb',
			'encoded': 'a&Cscr;b'
		},
		{
			'decoded': 'a\uD835\uDCB8b',
			'encoded': 'a&cscr;b'
		},
		{
			'decoded': 'a\u2ACFb',
			'encoded': 'a&csub;b'
		},
		{
			'decoded': 'a\u2AD1b',
			'encoded': 'a&csube;b'
		},
		{
			'decoded': 'a\u2AD0b',
			'encoded': 'a&csup;b'
		},
		{
			'decoded': 'a\u2AD2b',
			'encoded': 'a&csupe;b'
		},
		{
			'decoded': 'a\u22EFb',
			'encoded': 'a&ctdot;b'
		},
		{
			'decoded': 'a\u2938b',
			'encoded': 'a&cudarrl;b'
		},
		{
			'decoded': 'a\u2935b',
			'encoded': 'a&cudarrr;b'
		},
		{
			'decoded': 'a\u22DEb',
			'encoded': 'a&cuepr;b'
		},
		{
			'decoded': 'a\u22DFb',
			'encoded': 'a&cuesc;b'
		},
		{
			'decoded': 'a\u21B6b',
			'encoded': 'a&cularr;b'
		},
		{
			'decoded': 'a\u293Db',
			'encoded': 'a&cularrp;b'
		},
		{
			'decoded': 'a\u2A48b',
			'encoded': 'a&cupbrcap;b'
		},
		{
			'decoded': 'a\u2A46b',
			'encoded': 'a&cupcap;b'
		},
		{
			'decoded': 'a\u224Db',
			'encoded': 'a&CupCap;b'
		},
		{
			'decoded': 'a\u222Ab',
			'encoded': 'a&cup;b'
		},
		{
			'decoded': 'a\u22D3b',
			'encoded': 'a&Cup;b'
		},
		{
			'decoded': 'a\u2A4Ab',
			'encoded': 'a&cupcup;b'
		},
		{
			'decoded': 'a\u228Db',
			'encoded': 'a&cupdot;b'
		},
		{
			'decoded': 'a\u2A45b',
			'encoded': 'a&cupor;b'
		},
		{
			'decoded': 'a\u222A\uFE00b',
			'encoded': 'a&cups;b'
		},
		{
			'decoded': 'a\u21B7b',
			'encoded': 'a&curarr;b'
		},
		{
			'decoded': 'a\u293Cb',
			'encoded': 'a&curarrm;b'
		},
		{
			'decoded': 'a\xA4b',
			'encoded': 'a&curren;b'
		},
		{
			'decoded': 'a\u22CEb',
			'encoded': 'a&cuvee;b'
		},
		{
			'decoded': 'a\u22CFb',
			'encoded': 'a&cuwed;b'
		},
		{
			'decoded': 'a\u2232b',
			'encoded': 'a&cwconint;b'
		},
		{
			'decoded': 'a\u2231b',
			'encoded': 'a&cwint;b'
		},
		{
			'decoded': 'a\u232Db',
			'encoded': 'a&cylcty;b'
		},
		{
			'decoded': 'a\u2020b',
			'encoded': 'a&dagger;b'
		},
		{
			'decoded': 'a\u2021b',
			'encoded': 'a&Dagger;b'
		},
		{
			'decoded': 'a\u2138b',
			'encoded': 'a&daleth;b'
		},
		{
			'decoded': 'a\u2193b',
			'encoded': 'a&darr;b'
		},
		{
			'decoded': 'a\u21A1b',
			'encoded': 'a&Darr;b'
		},
		{
			'decoded': 'a\u21D3b',
			'encoded': 'a&dArr;b'
		},
		{
			'decoded': 'a\u2010b',
			'encoded': 'a&dash;b'
		},
		{
			'decoded': 'a\u2AE4b',
			'encoded': 'a&Dashv;b'
		},
		{
			'decoded': 'a\u22A3b',
			'encoded': 'a&dashv;b'
		},
		{
			'decoded': 'a\u02DDb',
			'encoded': 'a&dblac;b'
		},
		{
			'decoded': 'a\u010Eb',
			'encoded': 'a&Dcaron;b'
		},
		{
			'decoded': 'a\u010Fb',
			'encoded': 'a&dcaron;b'
		},
		{
			'decoded': 'a\u0414b',
			'encoded': 'a&Dcy;b'
		},
		{
			'decoded': 'a\u0434b',
			'encoded': 'a&dcy;b'
		},
		{
			'decoded': 'a\u21CAb',
			'encoded': 'a&ddarr;b'
		},
		{
			'decoded': 'a\u2145b',
			'encoded': 'a&DD;b'
		},
		{
			'decoded': 'a\u2146b',
			'encoded': 'a&dd;b'
		},
		{
			'decoded': 'a\u2911b',
			'encoded': 'a&DDotrahd;b'
		},
		{
			'decoded': 'a\xB0b',
			'encoded': 'a&deg;b'
		},
		{
			'decoded': 'a\u2207b',
			'encoded': 'a&Del;b'
		},
		{
			'decoded': 'a\u0394b',
			'encoded': 'a&Delta;b'
		},
		{
			'decoded': 'a\u03B4b',
			'encoded': 'a&delta;b'
		},
		{
			'decoded': 'a\u29B1b',
			'encoded': 'a&demptyv;b'
		},
		{
			'decoded': 'a\u297Fb',
			'encoded': 'a&dfisht;b'
		},
		{
			'decoded': 'a\uD835\uDD07b',
			'encoded': 'a&Dfr;b'
		},
		{
			'decoded': 'a\uD835\uDD21b',
			'encoded': 'a&dfr;b'
		},
		{
			'decoded': 'a\u2965b',
			'encoded': 'a&dHar;b'
		},
		{
			'decoded': 'a\u21C3b',
			'encoded': 'a&dharl;b'
		},
		{
			'decoded': 'a\u21C2b',
			'encoded': 'a&dharr;b'
		},
		{
			'decoded': 'a\u22C4b',
			'encoded': 'a&diam;b'
		},
		{
			'decoded': 'a\u2666b',
			'encoded': 'a&diams;b'
		},
		{
			'decoded': 'a\xA8b',
			'encoded': 'a&die;b'
		},
		{
			'decoded': 'a\u22F2b',
			'encoded': 'a&disin;b'
		},
		{
			'decoded': 'a\xF7b',
			'encoded': 'a&div;b'
		},
		{
			'decoded': 'a\u22C7b',
			'encoded': 'a&divonx;b'
		},
		{
			'decoded': 'a\u0402b',
			'encoded': 'a&DJcy;b'
		},
		{
			'decoded': 'a\u0452b',
			'encoded': 'a&djcy;b'
		},
		{
			'decoded': 'a\u231Eb',
			'encoded': 'a&dlcorn;b'
		},
		{
			'decoded': 'a\u230Db',
			'encoded': 'a&dlcrop;b'
		},
		{
			'decoded': 'a\uD835\uDD3Bb',
			'encoded': 'a&Dopf;b'
		},
		{
			'decoded': 'a\uD835\uDD55b',
			'encoded': 'a&dopf;b'
		},
		{
			'decoded': 'a\u02D9b',
			'encoded': 'a&dot;b'
		},
		{
			'decoded': 'a\u20DCb',
			'encoded': 'a&DotDot;b'
		},
		{
			'decoded': 'a\u2250b',
			'encoded': 'a&doteq;b'
		},
		{
			'decoded': 'a\u2913b',
			'encoded': 'a&DownArrowBar;b'
		},
		{
			'decoded': 'a\u0311b',
			'encoded': 'a&DownBreve;b'
		},
		{
			'decoded': 'a\u2950b',
			'encoded': 'a&DownLeftRightVector;b'
		},
		{
			'decoded': 'a\u295Eb',
			'encoded': 'a&DownLeftTeeVector;b'
		},
		{
			'decoded': 'a\u2956b',
			'encoded': 'a&DownLeftVectorBar;b'
		},
		{
			'decoded': 'a\u295Fb',
			'encoded': 'a&DownRightTeeVector;b'
		},
		{
			'decoded': 'a\u2957b',
			'encoded': 'a&DownRightVectorBar;b'
		},
		{
			'decoded': 'a\u231Fb',
			'encoded': 'a&drcorn;b'
		},
		{
			'decoded': 'a\u230Cb',
			'encoded': 'a&drcrop;b'
		},
		{
			'decoded': 'a\uD835\uDC9Fb',
			'encoded': 'a&Dscr;b'
		},
		{
			'decoded': 'a\uD835\uDCB9b',
			'encoded': 'a&dscr;b'
		},
		{
			'decoded': 'a\u0405b',
			'encoded': 'a&DScy;b'
		},
		{
			'decoded': 'a\u0455b',
			'encoded': 'a&dscy;b'
		},
		{
			'decoded': 'a\u29F6b',
			'encoded': 'a&dsol;b'
		},
		{
			'decoded': 'a\u0110b',
			'encoded': 'a&Dstrok;b'
		},
		{
			'decoded': 'a\u0111b',
			'encoded': 'a&dstrok;b'
		},
		{
			'decoded': 'a\u22F1b',
			'encoded': 'a&dtdot;b'
		},
		{
			'decoded': 'a\u25BFb',
			'encoded': 'a&dtri;b'
		},
		{
			'decoded': 'a\u25BEb',
			'encoded': 'a&dtrif;b'
		},
		{
			'decoded': 'a\u21F5b',
			'encoded': 'a&duarr;b'
		},
		{
			'decoded': 'a\u296Fb',
			'encoded': 'a&duhar;b'
		},
		{
			'decoded': 'a\u29A6b',
			'encoded': 'a&dwangle;b'
		},
		{
			'decoded': 'a\u040Fb',
			'encoded': 'a&DZcy;b'
		},
		{
			'decoded': 'a\u045Fb',
			'encoded': 'a&dzcy;b'
		},
		{
			'decoded': 'a\u27FFb',
			'encoded': 'a&dzigrarr;b'
		},
		{
			'decoded': 'a\xC9b',
			'encoded': 'a&Eacute;b'
		},
		{
			'decoded': 'a\xE9b',
			'encoded': 'a&eacute;b'
		},
		{
			'decoded': 'a\u2A6Eb',
			'encoded': 'a&easter;b'
		},
		{
			'decoded': 'a\u011Ab',
			'encoded': 'a&Ecaron;b'
		},
		{
			'decoded': 'a\u011Bb',
			'encoded': 'a&ecaron;b'
		},
		{
			'decoded': 'a\xCAb',
			'encoded': 'a&Ecirc;b'
		},
		{
			'decoded': 'a\xEAb',
			'encoded': 'a&ecirc;b'
		},
		{
			'decoded': 'a\u2256b',
			'encoded': 'a&ecir;b'
		},
		{
			'decoded': 'a\u2255b',
			'encoded': 'a&ecolon;b'
		},
		{
			'decoded': 'a\u042Db',
			'encoded': 'a&Ecy;b'
		},
		{
			'decoded': 'a\u044Db',
			'encoded': 'a&ecy;b'
		},
		{
			'decoded': 'a\u2A77b',
			'encoded': 'a&eDDot;b'
		},
		{
			'decoded': 'a\u0116b',
			'encoded': 'a&Edot;b'
		},
		{
			'decoded': 'a\u0117b',
			'encoded': 'a&edot;b'
		},
		{
			'decoded': 'a\u2251b',
			'encoded': 'a&eDot;b'
		},
		{
			'decoded': 'a\u2147b',
			'encoded': 'a&ee;b'
		},
		{
			'decoded': 'a\u2252b',
			'encoded': 'a&efDot;b'
		},
		{
			'decoded': 'a\uD835\uDD08b',
			'encoded': 'a&Efr;b'
		},
		{
			'decoded': 'a\uD835\uDD22b',
			'encoded': 'a&efr;b'
		},
		{
			'decoded': 'a\u2A9Ab',
			'encoded': 'a&eg;b'
		},
		{
			'decoded': 'a\xC8b',
			'encoded': 'a&Egrave;b'
		},
		{
			'decoded': 'a\xE8b',
			'encoded': 'a&egrave;b'
		},
		{
			'decoded': 'a\u2A96b',
			'encoded': 'a&egs;b'
		},
		{
			'decoded': 'a\u2A98b',
			'encoded': 'a&egsdot;b'
		},
		{
			'decoded': 'a\u2A99b',
			'encoded': 'a&el;b'
		},
		{
			'decoded': 'a\u23E7b',
			'encoded': 'a&elinters;b'
		},
		{
			'decoded': 'a\u2113b',
			'encoded': 'a&ell;b'
		},
		{
			'decoded': 'a\u2A95b',
			'encoded': 'a&els;b'
		},
		{
			'decoded': 'a\u2A97b',
			'encoded': 'a&elsdot;b'
		},
		{
			'decoded': 'a\u0112b',
			'encoded': 'a&Emacr;b'
		},
		{
			'decoded': 'a\u0113b',
			'encoded': 'a&emacr;b'
		},
		{
			'decoded': 'a\u2205b',
			'encoded': 'a&empty;b'
		},
		{
			'decoded': 'a\u25FBb',
			'encoded': 'a&EmptySmallSquare;b'
		},
		{
			'decoded': 'a\u25ABb',
			'encoded': 'a&EmptyVerySmallSquare;b'
		},
		{
			'decoded': 'a\u2004b',
			'encoded': 'a&emsp13;b'
		},
		{
			'decoded': 'a\u2005b',
			'encoded': 'a&emsp14;b'
		},
		{
			'decoded': 'a\u2003b',
			'encoded': 'a&emsp;b'
		},
		{
			'decoded': 'a\u014Ab',
			'encoded': 'a&ENG;b'
		},
		{
			'decoded': 'a\u014Bb',
			'encoded': 'a&eng;b'
		},
		{
			'decoded': 'a\u2002b',
			'encoded': 'a&ensp;b'
		},
		{
			'decoded': 'a\u0118b',
			'encoded': 'a&Eogon;b'
		},
		{
			'decoded': 'a\u0119b',
			'encoded': 'a&eogon;b'
		},
		{
			'decoded': 'a\uD835\uDD3Cb',
			'encoded': 'a&Eopf;b'
		},
		{
			'decoded': 'a\uD835\uDD56b',
			'encoded': 'a&eopf;b'
		},
		{
			'decoded': 'a\u22D5b',
			'encoded': 'a&epar;b'
		},
		{
			'decoded': 'a\u29E3b',
			'encoded': 'a&eparsl;b'
		},
		{
			'decoded': 'a\u2A71b',
			'encoded': 'a&eplus;b'
		},
		{
			'decoded': 'a\u03B5b',
			'encoded': 'a&epsi;b'
		},
		{
			'decoded': 'a\u0395b',
			'encoded': 'a&Epsilon;b'
		},
		{
			'decoded': 'a\u03F5b',
			'encoded': 'a&epsiv;b'
		},
		{
			'decoded': 'a\u2A75b',
			'encoded': 'a&Equal;b'
		},
		{
			'decoded': 'a\u2261b',
			'encoded': 'a&equiv;b'
		},
		{
			'decoded': 'a\u2A78b',
			'encoded': 'a&equivDD;b'
		},
		{
			'decoded': 'a\u29E5b',
			'encoded': 'a&eqvparsl;b'
		},
		{
			'decoded': 'a\u2971b',
			'encoded': 'a&erarr;b'
		},
		{
			'decoded': 'a\u2253b',
			'encoded': 'a&erDot;b'
		},
		{
			'decoded': 'a\u212Fb',
			'encoded': 'a&escr;b'
		},
		{
			'decoded': 'a\u2130b',
			'encoded': 'a&Escr;b'
		},
		{
			'decoded': 'a\u2A73b',
			'encoded': 'a&Esim;b'
		},
		{
			'decoded': 'a\u2242b',
			'encoded': 'a&esim;b'
		},
		{
			'decoded': 'a\u0397b',
			'encoded': 'a&Eta;b'
		},
		{
			'decoded': 'a\u03B7b',
			'encoded': 'a&eta;b'
		},
		{
			'decoded': 'a\xD0b',
			'encoded': 'a&ETH;b'
		},
		{
			'decoded': 'a\xF0b',
			'encoded': 'a&eth;b'
		},
		{
			'decoded': 'a\xCBb',
			'encoded': 'a&Euml;b'
		},
		{
			'decoded': 'a\xEBb',
			'encoded': 'a&euml;b'
		},
		{
			'decoded': 'a\u20ACb',
			'encoded': 'a&euro;b'
		},
		{
			'decoded': 'a\u2203b',
			'encoded': 'a&exist;b'
		},
		{
			'decoded': 'a\u0424b',
			'encoded': 'a&Fcy;b'
		},
		{
			'decoded': 'a\u0444b',
			'encoded': 'a&fcy;b'
		},
		{
			'decoded': 'a\u2640b',
			'encoded': 'a&female;b'
		},
		{
			'decoded': 'a\uFB03b',
			'encoded': 'a&ffilig;b'
		},
		{
			'decoded': 'a\uFB00b',
			'encoded': 'a&fflig;b'
		},
		{
			'decoded': 'a\uFB04b',
			'encoded': 'a&ffllig;b'
		},
		{
			'decoded': 'a\uD835\uDD09b',
			'encoded': 'a&Ffr;b'
		},
		{
			'decoded': 'a\uD835\uDD23b',
			'encoded': 'a&ffr;b'
		},
		{
			'decoded': 'a\uFB01b',
			'encoded': 'a&filig;b'
		},
		{
			'decoded': 'a\u25FCb',
			'encoded': 'a&FilledSmallSquare;b'
		},
		{
			'decoded': 'a\u266Db',
			'encoded': 'a&flat;b'
		},
		{
			'decoded': 'a\uFB02b',
			'encoded': 'a&fllig;b'
		},
		{
			'decoded': 'a\u25B1b',
			'encoded': 'a&fltns;b'
		},
		{
			'decoded': 'a\u0192b',
			'encoded': 'a&fnof;b'
		},
		{
			'decoded': 'a\uD835\uDD3Db',
			'encoded': 'a&Fopf;b'
		},
		{
			'decoded': 'a\uD835\uDD57b',
			'encoded': 'a&fopf;b'
		},
		{
			'decoded': 'a\u2200b',
			'encoded': 'a&forall;b'
		},
		{
			'decoded': 'a\u22D4b',
			'encoded': 'a&fork;b'
		},
		{
			'decoded': 'a\u2AD9b',
			'encoded': 'a&forkv;b'
		},
		{
			'decoded': 'a\u2A0Db',
			'encoded': 'a&fpartint;b'
		},
		{
			'decoded': 'a\u2153b',
			'encoded': 'a&frac13;b'
		},
		{
			'decoded': 'a\xBCb',
			'encoded': 'a&frac14;b'
		},
		{
			'decoded': 'a\u2155b',
			'encoded': 'a&frac15;b'
		},
		{
			'decoded': 'a\u2159b',
			'encoded': 'a&frac16;b'
		},
		{
			'decoded': 'a\u215Bb',
			'encoded': 'a&frac18;b'
		},
		{
			'decoded': 'a\u2154b',
			'encoded': 'a&frac23;b'
		},
		{
			'decoded': 'a\u2156b',
			'encoded': 'a&frac25;b'
		},
		{
			'decoded': 'a\xBEb',
			'encoded': 'a&frac34;b'
		},
		{
			'decoded': 'a\u2157b',
			'encoded': 'a&frac35;b'
		},
		{
			'decoded': 'a\u215Cb',
			'encoded': 'a&frac38;b'
		},
		{
			'decoded': 'a\u2158b',
			'encoded': 'a&frac45;b'
		},
		{
			'decoded': 'a\u215Ab',
			'encoded': 'a&frac56;b'
		},
		{
			'decoded': 'a\u215Db',
			'encoded': 'a&frac58;b'
		},
		{
			'decoded': 'a\u215Eb',
			'encoded': 'a&frac78;b'
		},
		{
			'decoded': 'a\u2044b',
			'encoded': 'a&frasl;b'
		},
		{
			'decoded': 'a\u2322b',
			'encoded': 'a&frown;b'
		},
		{
			'decoded': 'a\uD835\uDCBBb',
			'encoded': 'a&fscr;b'
		},
		{
			'decoded': 'a\u2131b',
			'encoded': 'a&Fscr;b'
		},
		{
			'decoded': 'a\u01F5b',
			'encoded': 'a&gacute;b'
		},
		{
			'decoded': 'a\u0393b',
			'encoded': 'a&Gamma;b'
		},
		{
			'decoded': 'a\u03B3b',
			'encoded': 'a&gamma;b'
		},
		{
			'decoded': 'a\u03DCb',
			'encoded': 'a&Gammad;b'
		},
		{
			'decoded': 'a\u03DDb',
			'encoded': 'a&gammad;b'
		},
		{
			'decoded': 'a\u2A86b',
			'encoded': 'a&gap;b'
		},
		{
			'decoded': 'a\u011Eb',
			'encoded': 'a&Gbreve;b'
		},
		{
			'decoded': 'a\u011Fb',
			'encoded': 'a&gbreve;b'
		},
		{
			'decoded': 'a\u0122b',
			'encoded': 'a&Gcedil;b'
		},
		{
			'decoded': 'a\u011Cb',
			'encoded': 'a&Gcirc;b'
		},
		{
			'decoded': 'a\u011Db',
			'encoded': 'a&gcirc;b'
		},
		{
			'decoded': 'a\u0413b',
			'encoded': 'a&Gcy;b'
		},
		{
			'decoded': 'a\u0433b',
			'encoded': 'a&gcy;b'
		},
		{
			'decoded': 'a\u0120b',
			'encoded': 'a&Gdot;b'
		},
		{
			'decoded': 'a\u0121b',
			'encoded': 'a&gdot;b'
		},
		{
			'decoded': 'a\u2265b',
			'encoded': 'a&ge;b'
		},
		{
			'decoded': 'a\u2267b',
			'encoded': 'a&gE;b'
		},
		{
			'decoded': 'a\u2A8Cb',
			'encoded': 'a&gEl;b'
		},
		{
			'decoded': 'a\u22DBb',
			'encoded': 'a&gel;b'
		},
		{
			'decoded': 'a\u2AA9b',
			'encoded': 'a&gescc;b'
		},
		{
			'decoded': 'a\u2A7Eb',
			'encoded': 'a&ges;b'
		},
		{
			'decoded': 'a\u2A80b',
			'encoded': 'a&gesdot;b'
		},
		{
			'decoded': 'a\u2A82b',
			'encoded': 'a&gesdoto;b'
		},
		{
			'decoded': 'a\u2A84b',
			'encoded': 'a&gesdotol;b'
		},
		{
			'decoded': 'a\u22DB\uFE00b',
			'encoded': 'a&gesl;b'
		},
		{
			'decoded': 'a\u2A94b',
			'encoded': 'a&gesles;b'
		},
		{
			'decoded': 'a\uD835\uDD0Ab',
			'encoded': 'a&Gfr;b'
		},
		{
			'decoded': 'a\uD835\uDD24b',
			'encoded': 'a&gfr;b'
		},
		{
			'decoded': 'a\u226Bb',
			'encoded': 'a&gg;b'
		},
		{
			'decoded': 'a\u22D9b',
			'encoded': 'a&Gg;b'
		},
		{
			'decoded': 'a\u2137b',
			'encoded': 'a&gimel;b'
		},
		{
			'decoded': 'a\u0403b',
			'encoded': 'a&GJcy;b'
		},
		{
			'decoded': 'a\u0453b',
			'encoded': 'a&gjcy;b'
		},
		{
			'decoded': 'a\u2AA5b',
			'encoded': 'a&gla;b'
		},
		{
			'decoded': 'a\u2277b',
			'encoded': 'a&gl;b'
		},
		{
			'decoded': 'a\u2A92b',
			'encoded': 'a&glE;b'
		},
		{
			'decoded': 'a\u2AA4b',
			'encoded': 'a&glj;b'
		},
		{
			'decoded': 'a\u2A8Ab',
			'encoded': 'a&gnap;b'
		},
		{
			'decoded': 'a\u2A88b',
			'encoded': 'a&gne;b'
		},
		{
			'decoded': 'a\u2269b',
			'encoded': 'a&gnE;b'
		},
		{
			'decoded': 'a\u22E7b',
			'encoded': 'a&gnsim;b'
		},
		{
			'decoded': 'a\uD835\uDD3Eb',
			'encoded': 'a&Gopf;b'
		},
		{
			'decoded': 'a\uD835\uDD58b',
			'encoded': 'a&gopf;b'
		},
		{
			'decoded': 'a\u2AA2b',
			'encoded': 'a&GreaterGreater;b'
		},
		{
			'decoded': 'a\uD835\uDCA2b',
			'encoded': 'a&Gscr;b'
		},
		{
			'decoded': 'a\u210Ab',
			'encoded': 'a&gscr;b'
		},
		{
			'decoded': 'a\u2273b',
			'encoded': 'a&gsim;b'
		},
		{
			'decoded': 'a\u2A8Eb',
			'encoded': 'a&gsime;b'
		},
		{
			'decoded': 'a\u2A90b',
			'encoded': 'a&gsiml;b'
		},
		{
			'decoded': 'a\u2AA7b',
			'encoded': 'a&gtcc;b'
		},
		{
			'decoded': 'a\u2A7Ab',
			'encoded': 'a&gtcir;b'
		},
		{
			'decoded': 'a>b',
			'encoded': 'a&gt;b'
		},
		{
			'decoded': 'a\u22D7b',
			'encoded': 'a&gtdot;b'
		},
		{
			'decoded': 'a\u2995b',
			'encoded': 'a&gtlPar;b'
		},
		{
			'decoded': 'a\u2A7Cb',
			'encoded': 'a&gtquest;b'
		},
		{
			'decoded': 'a\u2978b',
			'encoded': 'a&gtrarr;b'
		},
		{
			'decoded': 'a\u2269\uFE00b',
			'encoded': 'a&gvnE;b'
		},
		{
			'decoded': 'a\u200Ab',
			'encoded': 'a&hairsp;b'
		},
		{
			'decoded': 'a\xBDb',
			'encoded': 'a&half;b'
		},
		{
			'decoded': 'a\u042Ab',
			'encoded': 'a&HARDcy;b'
		},
		{
			'decoded': 'a\u044Ab',
			'encoded': 'a&hardcy;b'
		},
		{
			'decoded': 'a\u2948b',
			'encoded': 'a&harrcir;b'
		},
		{
			'decoded': 'a\u2194b',
			'encoded': 'a&harr;b'
		},
		{
			'decoded': 'a\u21ADb',
			'encoded': 'a&harrw;b'
		},
		{
			'decoded': 'a\u210Fb',
			'encoded': 'a&hbar;b'
		},
		{
			'decoded': 'a\u0124b',
			'encoded': 'a&Hcirc;b'
		},
		{
			'decoded': 'a\u0125b',
			'encoded': 'a&hcirc;b'
		},
		{
			'decoded': 'a\u2665b',
			'encoded': 'a&hearts;b'
		},
		{
			'decoded': 'a\u22B9b',
			'encoded': 'a&hercon;b'
		},
		{
			'decoded': 'a\uD835\uDD25b',
			'encoded': 'a&hfr;b'
		},
		{
			'decoded': 'a\u210Cb',
			'encoded': 'a&Hfr;b'
		},
		{
			'decoded': 'a\u21FFb',
			'encoded': 'a&hoarr;b'
		},
		{
			'decoded': 'a\u223Bb',
			'encoded': 'a&homtht;b'
		},
		{
			'decoded': 'a\uD835\uDD59b',
			'encoded': 'a&hopf;b'
		},
		{
			'decoded': 'a\u210Db',
			'encoded': 'a&Hopf;b'
		},
		{
			'decoded': 'a\u2015b',
			'encoded': 'a&horbar;b'
		},
		{
			'decoded': 'a\uD835\uDCBDb',
			'encoded': 'a&hscr;b'
		},
		{
			'decoded': 'a\u210Bb',
			'encoded': 'a&Hscr;b'
		},
		{
			'decoded': 'a\u0126b',
			'encoded': 'a&Hstrok;b'
		},
		{
			'decoded': 'a\u0127b',
			'encoded': 'a&hstrok;b'
		},
		{
			'decoded': 'a\u2043b',
			'encoded': 'a&hybull;b'
		},
		{
			'decoded': 'a\xCDb',
			'encoded': 'a&Iacute;b'
		},
		{
			'decoded': 'a\xEDb',
			'encoded': 'a&iacute;b'
		},
		{
			'decoded': 'a\u2063b',
			'encoded': 'a&ic;b'
		},
		{
			'decoded': 'a\xCEb',
			'encoded': 'a&Icirc;b'
		},
		{
			'decoded': 'a\xEEb',
			'encoded': 'a&icirc;b'
		},
		{
			'decoded': 'a\u0418b',
			'encoded': 'a&Icy;b'
		},
		{
			'decoded': 'a\u0438b',
			'encoded': 'a&icy;b'
		},
		{
			'decoded': 'a\u0130b',
			'encoded': 'a&Idot;b'
		},
		{
			'decoded': 'a\u0415b',
			'encoded': 'a&IEcy;b'
		},
		{
			'decoded': 'a\u0435b',
			'encoded': 'a&iecy;b'
		},
		{
			'decoded': 'a\xA1b',
			'encoded': 'a&iexcl;b'
		},
		{
			'decoded': 'a\u21D4b',
			'encoded': 'a&iff;b'
		},
		{
			'decoded': 'a\uD835\uDD26b',
			'encoded': 'a&ifr;b'
		},
		{
			'decoded': 'a\xCCb',
			'encoded': 'a&Igrave;b'
		},
		{
			'decoded': 'a\xECb',
			'encoded': 'a&igrave;b'
		},
		{
			'decoded': 'a\u2148b',
			'encoded': 'a&ii;b'
		},
		{
			'decoded': 'a\u29DCb',
			'encoded': 'a&iinfin;b'
		},
		{
			'decoded': 'a\u2129b',
			'encoded': 'a&iiota;b'
		},
		{
			'decoded': 'a\u0132b',
			'encoded': 'a&IJlig;b'
		},
		{
			'decoded': 'a\u0133b',
			'encoded': 'a&ijlig;b'
		},
		{
			'decoded': 'a\u012Ab',
			'encoded': 'a&Imacr;b'
		},
		{
			'decoded': 'a\u012Bb',
			'encoded': 'a&imacr;b'
		},
		{
			'decoded': 'a\u0131b',
			'encoded': 'a&imath;b'
		},
		{
			'decoded': 'a\u2111b',
			'encoded': 'a&Im;b'
		},
		{
			'decoded': 'a\u22B7b',
			'encoded': 'a&imof;b'
		},
		{
			'decoded': 'a\u01B5b',
			'encoded': 'a&imped;b'
		},
		{
			'decoded': 'a\u2105b',
			'encoded': 'a&incare;b'
		},
		{
			'decoded': 'a\u2208b',
			'encoded': 'a&in;b'
		},
		{
			'decoded': 'a\u221Eb',
			'encoded': 'a&infin;b'
		},
		{
			'decoded': 'a\u29DDb',
			'encoded': 'a&infintie;b'
		},
		{
			'decoded': 'a\u22BAb',
			'encoded': 'a&intcal;b'
		},
		{
			'decoded': 'a\u222Bb',
			'encoded': 'a&int;b'
		},
		{
			'decoded': 'a\u222Cb',
			'encoded': 'a&Int;b'
		},
		{
			'decoded': 'a\u2A17b',
			'encoded': 'a&intlarhk;b'
		},
		{
			'decoded': 'a\u0401b',
			'encoded': 'a&IOcy;b'
		},
		{
			'decoded': 'a\u0451b',
			'encoded': 'a&iocy;b'
		},
		{
			'decoded': 'a\u012Eb',
			'encoded': 'a&Iogon;b'
		},
		{
			'decoded': 'a\u012Fb',
			'encoded': 'a&iogon;b'
		},
		{
			'decoded': 'a\uD835\uDD40b',
			'encoded': 'a&Iopf;b'
		},
		{
			'decoded': 'a\uD835\uDD5Ab',
			'encoded': 'a&iopf;b'
		},
		{
			'decoded': 'a\u0399b',
			'encoded': 'a&Iota;b'
		},
		{
			'decoded': 'a\u03B9b',
			'encoded': 'a&iota;b'
		},
		{
			'decoded': 'a\u2A3Cb',
			'encoded': 'a&iprod;b'
		},
		{
			'decoded': 'a\xBFb',
			'encoded': 'a&iquest;b'
		},
		{
			'decoded': 'a\uD835\uDCBEb',
			'encoded': 'a&iscr;b'
		},
		{
			'decoded': 'a\u2110b',
			'encoded': 'a&Iscr;b'
		},
		{
			'decoded': 'a\u22F5b',
			'encoded': 'a&isindot;b'
		},
		{
			'decoded': 'a\u22F9b',
			'encoded': 'a&isinE;b'
		},
		{
			'decoded': 'a\u22F4b',
			'encoded': 'a&isins;b'
		},
		{
			'decoded': 'a\u22F3b',
			'encoded': 'a&isinsv;b'
		},
		{
			'decoded': 'a\u2062b',
			'encoded': 'a&it;b'
		},
		{
			'decoded': 'a\u0128b',
			'encoded': 'a&Itilde;b'
		},
		{
			'decoded': 'a\u0129b',
			'encoded': 'a&itilde;b'
		},
		{
			'decoded': 'a\u0406b',
			'encoded': 'a&Iukcy;b'
		},
		{
			'decoded': 'a\u0456b',
			'encoded': 'a&iukcy;b'
		},
		{
			'decoded': 'a\xCFb',
			'encoded': 'a&Iuml;b'
		},
		{
			'decoded': 'a\xEFb',
			'encoded': 'a&iuml;b'
		},
		{
			'decoded': 'a\u0134b',
			'encoded': 'a&Jcirc;b'
		},
		{
			'decoded': 'a\u0135b',
			'encoded': 'a&jcirc;b'
		},
		{
			'decoded': 'a\u0419b',
			'encoded': 'a&Jcy;b'
		},
		{
			'decoded': 'a\u0439b',
			'encoded': 'a&jcy;b'
		},
		{
			'decoded': 'a\uD835\uDD0Db',
			'encoded': 'a&Jfr;b'
		},
		{
			'decoded': 'a\uD835\uDD27b',
			'encoded': 'a&jfr;b'
		},
		{
			'decoded': 'a\u0237b',
			'encoded': 'a&jmath;b'
		},
		{
			'decoded': 'a\uD835\uDD41b',
			'encoded': 'a&Jopf;b'
		},
		{
			'decoded': 'a\uD835\uDD5Bb',
			'encoded': 'a&jopf;b'
		},
		{
			'decoded': 'a\uD835\uDCA5b',
			'encoded': 'a&Jscr;b'
		},
		{
			'decoded': 'a\uD835\uDCBFb',
			'encoded': 'a&jscr;b'
		},
		{
			'decoded': 'a\u0408b',
			'encoded': 'a&Jsercy;b'
		},
		{
			'decoded': 'a\u0458b',
			'encoded': 'a&jsercy;b'
		},
		{
			'decoded': 'a\u0404b',
			'encoded': 'a&Jukcy;b'
		},
		{
			'decoded': 'a\u0454b',
			'encoded': 'a&jukcy;b'
		},
		{
			'decoded': 'a\u039Ab',
			'encoded': 'a&Kappa;b'
		},
		{
			'decoded': 'a\u03BAb',
			'encoded': 'a&kappa;b'
		},
		{
			'decoded': 'a\u03F0b',
			'encoded': 'a&kappav;b'
		},
		{
			'decoded': 'a\u0136b',
			'encoded': 'a&Kcedil;b'
		},
		{
			'decoded': 'a\u0137b',
			'encoded': 'a&kcedil;b'
		},
		{
			'decoded': 'a\u041Ab',
			'encoded': 'a&Kcy;b'
		},
		{
			'decoded': 'a\u043Ab',
			'encoded': 'a&kcy;b'
		},
		{
			'decoded': 'a\uD835\uDD0Eb',
			'encoded': 'a&Kfr;b'
		},
		{
			'decoded': 'a\uD835\uDD28b',
			'encoded': 'a&kfr;b'
		},
		{
			'decoded': 'a\u0138b',
			'encoded': 'a&kgreen;b'
		},
		{
			'decoded': 'a\u0425b',
			'encoded': 'a&KHcy;b'
		},
		{
			'decoded': 'a\u0445b',
			'encoded': 'a&khcy;b'
		},
		{
			'decoded': 'a\u040Cb',
			'encoded': 'a&KJcy;b'
		},
		{
			'decoded': 'a\u045Cb',
			'encoded': 'a&kjcy;b'
		},
		{
			'decoded': 'a\uD835\uDD42b',
			'encoded': 'a&Kopf;b'
		},
		{
			'decoded': 'a\uD835\uDD5Cb',
			'encoded': 'a&kopf;b'
		},
		{
			'decoded': 'a\uD835\uDCA6b',
			'encoded': 'a&Kscr;b'
		},
		{
			'decoded': 'a\uD835\uDCC0b',
			'encoded': 'a&kscr;b'
		},
		{
			'decoded': 'a\u21DAb',
			'encoded': 'a&lAarr;b'
		},
		{
			'decoded': 'a\u0139b',
			'encoded': 'a&Lacute;b'
		},
		{
			'decoded': 'a\u013Ab',
			'encoded': 'a&lacute;b'
		},
		{
			'decoded': 'a\u29B4b',
			'encoded': 'a&laemptyv;b'
		},
		{
			'decoded': 'a\u039Bb',
			'encoded': 'a&Lambda;b'
		},
		{
			'decoded': 'a\u03BBb',
			'encoded': 'a&lambda;b'
		},
		{
			'decoded': 'a\u27E8b',
			'encoded': 'a&lang;b'
		},
		{
			'decoded': 'a\u27EAb',
			'encoded': 'a&Lang;b'
		},
		{
			'decoded': 'a\u2991b',
			'encoded': 'a&langd;b'
		},
		{
			'decoded': 'a\u2A85b',
			'encoded': 'a&lap;b'
		},
		{
			'decoded': 'a\xABb',
			'encoded': 'a&laquo;b'
		},
		{
			'decoded': 'a\u21E4b',
			'encoded': 'a&larrb;b'
		},
		{
			'decoded': 'a\u291Fb',
			'encoded': 'a&larrbfs;b'
		},
		{
			'decoded': 'a\u2190b',
			'encoded': 'a&larr;b'
		},
		{
			'decoded': 'a\u219Eb',
			'encoded': 'a&Larr;b'
		},
		{
			'decoded': 'a\u21D0b',
			'encoded': 'a&lArr;b'
		},
		{
			'decoded': 'a\u291Db',
			'encoded': 'a&larrfs;b'
		},
		{
			'decoded': 'a\u21A9b',
			'encoded': 'a&larrhk;b'
		},
		{
			'decoded': 'a\u21ABb',
			'encoded': 'a&larrlp;b'
		},
		{
			'decoded': 'a\u2939b',
			'encoded': 'a&larrpl;b'
		},
		{
			'decoded': 'a\u2973b',
			'encoded': 'a&larrsim;b'
		},
		{
			'decoded': 'a\u21A2b',
			'encoded': 'a&larrtl;b'
		},
		{
			'decoded': 'a\u2919b',
			'encoded': 'a&latail;b'
		},
		{
			'decoded': 'a\u291Bb',
			'encoded': 'a&lAtail;b'
		},
		{
			'decoded': 'a\u2AABb',
			'encoded': 'a&lat;b'
		},
		{
			'decoded': 'a\u2AADb',
			'encoded': 'a&late;b'
		},
		{
			'decoded': 'a\u2AAD\uFE00b',
			'encoded': 'a&lates;b'
		},
		{
			'decoded': 'a\u290Cb',
			'encoded': 'a&lbarr;b'
		},
		{
			'decoded': 'a\u290Eb',
			'encoded': 'a&lBarr;b'
		},
		{
			'decoded': 'a\u2772b',
			'encoded': 'a&lbbrk;b'
		},
		{
			'decoded': 'a\u298Bb',
			'encoded': 'a&lbrke;b'
		},
		{
			'decoded': 'a\u298Fb',
			'encoded': 'a&lbrksld;b'
		},
		{
			'decoded': 'a\u298Db',
			'encoded': 'a&lbrkslu;b'
		},
		{
			'decoded': 'a\u013Db',
			'encoded': 'a&Lcaron;b'
		},
		{
			'decoded': 'a\u013Eb',
			'encoded': 'a&lcaron;b'
		},
		{
			'decoded': 'a\u013Bb',
			'encoded': 'a&Lcedil;b'
		},
		{
			'decoded': 'a\u013Cb',
			'encoded': 'a&lcedil;b'
		},
		{
			'decoded': 'a\u2308b',
			'encoded': 'a&lceil;b'
		},
		{
			'decoded': 'a\u041Bb',
			'encoded': 'a&Lcy;b'
		},
		{
			'decoded': 'a\u043Bb',
			'encoded': 'a&lcy;b'
		},
		{
			'decoded': 'a\u2936b',
			'encoded': 'a&ldca;b'
		},
		{
			'decoded': 'a\u201Cb',
			'encoded': 'a&ldquo;b'
		},
		{
			'decoded': 'a\u2967b',
			'encoded': 'a&ldrdhar;b'
		},
		{
			'decoded': 'a\u294Bb',
			'encoded': 'a&ldrushar;b'
		},
		{
			'decoded': 'a\u21B2b',
			'encoded': 'a&ldsh;b'
		},
		{
			'decoded': 'a\u2264b',
			'encoded': 'a&le;b'
		},
		{
			'decoded': 'a\u2266b',
			'encoded': 'a&lE;b'
		},
		{
			'decoded': 'a\u2961b',
			'encoded': 'a&LeftDownTeeVector;b'
		},
		{
			'decoded': 'a\u2959b',
			'encoded': 'a&LeftDownVectorBar;b'
		},
		{
			'decoded': 'a\u294Eb',
			'encoded': 'a&LeftRightVector;b'
		},
		{
			'decoded': 'a\u295Ab',
			'encoded': 'a&LeftTeeVector;b'
		},
		{
			'decoded': 'a\u29CFb',
			'encoded': 'a&LeftTriangleBar;b'
		},
		{
			'decoded': 'a\u2951b',
			'encoded': 'a&LeftUpDownVector;b'
		},
		{
			'decoded': 'a\u2960b',
			'encoded': 'a&LeftUpTeeVector;b'
		},
		{
			'decoded': 'a\u2958b',
			'encoded': 'a&LeftUpVectorBar;b'
		},
		{
			'decoded': 'a\u2952b',
			'encoded': 'a&LeftVectorBar;b'
		},
		{
			'decoded': 'a\u2A8Bb',
			'encoded': 'a&lEg;b'
		},
		{
			'decoded': 'a\u22DAb',
			'encoded': 'a&leg;b'
		},
		{
			'decoded': 'a\u2AA8b',
			'encoded': 'a&lescc;b'
		},
		{
			'decoded': 'a\u2A7Db',
			'encoded': 'a&les;b'
		},
		{
			'decoded': 'a\u2A7Fb',
			'encoded': 'a&lesdot;b'
		},
		{
			'decoded': 'a\u2A81b',
			'encoded': 'a&lesdoto;b'
		},
		{
			'decoded': 'a\u2A83b',
			'encoded': 'a&lesdotor;b'
		},
		{
			'decoded': 'a\u22DA\uFE00b',
			'encoded': 'a&lesg;b'
		},
		{
			'decoded': 'a\u2A93b',
			'encoded': 'a&lesges;b'
		},
		{
			'decoded': 'a\u2AA1b',
			'encoded': 'a&LessLess;b'
		},
		{
			'decoded': 'a\u297Cb',
			'encoded': 'a&lfisht;b'
		},
		{
			'decoded': 'a\u230Ab',
			'encoded': 'a&lfloor;b'
		},
		{
			'decoded': 'a\uD835\uDD0Fb',
			'encoded': 'a&Lfr;b'
		},
		{
			'decoded': 'a\uD835\uDD29b',
			'encoded': 'a&lfr;b'
		},
		{
			'decoded': 'a\u2276b',
			'encoded': 'a&lg;b'
		},
		{
			'decoded': 'a\u2A91b',
			'encoded': 'a&lgE;b'
		},
		{
			'decoded': 'a\u2962b',
			'encoded': 'a&lHar;b'
		},
		{
			'decoded': 'a\u21BDb',
			'encoded': 'a&lhard;b'
		},
		{
			'decoded': 'a\u21BCb',
			'encoded': 'a&lharu;b'
		},
		{
			'decoded': 'a\u296Ab',
			'encoded': 'a&lharul;b'
		},
		{
			'decoded': 'a\u2584b',
			'encoded': 'a&lhblk;b'
		},
		{
			'decoded': 'a\u0409b',
			'encoded': 'a&LJcy;b'
		},
		{
			'decoded': 'a\u0459b',
			'encoded': 'a&ljcy;b'
		},
		{
			'decoded': 'a\u21C7b',
			'encoded': 'a&llarr;b'
		},
		{
			'decoded': 'a\u226Ab',
			'encoded': 'a&ll;b'
		},
		{
			'decoded': 'a\u22D8b',
			'encoded': 'a&Ll;b'
		},
		{
			'decoded': 'a\u296Bb',
			'encoded': 'a&llhard;b'
		},
		{
			'decoded': 'a\u25FAb',
			'encoded': 'a&lltri;b'
		},
		{
			'decoded': 'a\u013Fb',
			'encoded': 'a&Lmidot;b'
		},
		{
			'decoded': 'a\u0140b',
			'encoded': 'a&lmidot;b'
		},
		{
			'decoded': 'a\u23B0b',
			'encoded': 'a&lmoust;b'
		},
		{
			'decoded': 'a\u2A89b',
			'encoded': 'a&lnap;b'
		},
		{
			'decoded': 'a\u2A87b',
			'encoded': 'a&lne;b'
		},
		{
			'decoded': 'a\u2268b',
			'encoded': 'a&lnE;b'
		},
		{
			'decoded': 'a\u22E6b',
			'encoded': 'a&lnsim;b'
		},
		{
			'decoded': 'a\u27ECb',
			'encoded': 'a&loang;b'
		},
		{
			'decoded': 'a\u21FDb',
			'encoded': 'a&loarr;b'
		},
		{
			'decoded': 'a\u27E6b',
			'encoded': 'a&lobrk;b'
		},
		{
			'decoded': 'a\u2985b',
			'encoded': 'a&lopar;b'
		},
		{
			'decoded': 'a\uD835\uDD43b',
			'encoded': 'a&Lopf;b'
		},
		{
			'decoded': 'a\uD835\uDD5Db',
			'encoded': 'a&lopf;b'
		},
		{
			'decoded': 'a\u2A2Db',
			'encoded': 'a&loplus;b'
		},
		{
			'decoded': 'a\u2A34b',
			'encoded': 'a&lotimes;b'
		},
		{
			'decoded': 'a\u2217b',
			'encoded': 'a&lowast;b'
		},
		{
			'decoded': 'a\u25CAb',
			'encoded': 'a&loz;b'
		},
		{
			'decoded': 'a\u29EBb',
			'encoded': 'a&lozf;b'
		},
		{
			'decoded': 'a\u2993b',
			'encoded': 'a&lparlt;b'
		},
		{
			'decoded': 'a\u21C6b',
			'encoded': 'a&lrarr;b'
		},
		{
			'decoded': 'a\u21CBb',
			'encoded': 'a&lrhar;b'
		},
		{
			'decoded': 'a\u296Db',
			'encoded': 'a&lrhard;b'
		},
		{
			'decoded': 'a\u200Eb',
			'encoded': 'a&lrm;b'
		},
		{
			'decoded': 'a\u22BFb',
			'encoded': 'a&lrtri;b'
		},
		{
			'decoded': 'a\u2039b',
			'encoded': 'a&lsaquo;b'
		},
		{
			'decoded': 'a\uD835\uDCC1b',
			'encoded': 'a&lscr;b'
		},
		{
			'decoded': 'a\u2112b',
			'encoded': 'a&Lscr;b'
		},
		{
			'decoded': 'a\u21B0b',
			'encoded': 'a&lsh;b'
		},
		{
			'decoded': 'a\u2272b',
			'encoded': 'a&lsim;b'
		},
		{
			'decoded': 'a\u2A8Db',
			'encoded': 'a&lsime;b'
		},
		{
			'decoded': 'a\u2A8Fb',
			'encoded': 'a&lsimg;b'
		},
		{
			'decoded': 'a\u2018b',
			'encoded': 'a&lsquo;b'
		},
		{
			'decoded': 'a\u0141b',
			'encoded': 'a&Lstrok;b'
		},
		{
			'decoded': 'a\u0142b',
			'encoded': 'a&lstrok;b'
		},
		{
			'decoded': 'a\u2AA6b',
			'encoded': 'a&ltcc;b'
		},
		{
			'decoded': 'a\u2A79b',
			'encoded': 'a&ltcir;b'
		},
		{
			'decoded': 'a<b',
			'encoded': 'a&lt;b'
		},
		{
			'decoded': 'a\u22D6b',
			'encoded': 'a&ltdot;b'
		},
		{
			'decoded': 'a\u22CBb',
			'encoded': 'a&lthree;b'
		},
		{
			'decoded': 'a\u22C9b',
			'encoded': 'a&ltimes;b'
		},
		{
			'decoded': 'a\u2976b',
			'encoded': 'a&ltlarr;b'
		},
		{
			'decoded': 'a\u2A7Bb',
			'encoded': 'a&ltquest;b'
		},
		{
			'decoded': 'a\u25C3b',
			'encoded': 'a&ltri;b'
		},
		{
			'decoded': 'a\u22B4b',
			'encoded': 'a&ltrie;b'
		},
		{
			'decoded': 'a\u25C2b',
			'encoded': 'a&ltrif;b'
		},
		{
			'decoded': 'a\u2996b',
			'encoded': 'a&ltrPar;b'
		},
		{
			'decoded': 'a\u294Ab',
			'encoded': 'a&lurdshar;b'
		},
		{
			'decoded': 'a\u2966b',
			'encoded': 'a&luruhar;b'
		},
		{
			'decoded': 'a\u2268\uFE00b',
			'encoded': 'a&lvnE;b'
		},
		{
			'decoded': 'a\xAFb',
			'encoded': 'a&macr;b'
		},
		{
			'decoded': 'a\u2642b',
			'encoded': 'a&male;b'
		},
		{
			'decoded': 'a\u2720b',
			'encoded': 'a&malt;b'
		},
		{
			'decoded': 'a\u2905b',
			'encoded': 'a&Map;b'
		},
		{
			'decoded': 'a\u21A6b',
			'encoded': 'a&map;b'
		},
		{
			'decoded': 'a\u21A7b',
			'encoded': 'a&mapstodown;b'
		},
		{
			'decoded': 'a\u21A4b',
			'encoded': 'a&mapstoleft;b'
		},
		{
			'decoded': 'a\u21A5b',
			'encoded': 'a&mapstoup;b'
		},
		{
			'decoded': 'a\u25AEb',
			'encoded': 'a&marker;b'
		},
		{
			'decoded': 'a\u2A29b',
			'encoded': 'a&mcomma;b'
		},
		{
			'decoded': 'a\u041Cb',
			'encoded': 'a&Mcy;b'
		},
		{
			'decoded': 'a\u043Cb',
			'encoded': 'a&mcy;b'
		},
		{
			'decoded': 'a\u2014b',
			'encoded': 'a&mdash;b'
		},
		{
			'decoded': 'a\u223Ab',
			'encoded': 'a&mDDot;b'
		},
		{
			'decoded': 'a\u205Fb',
			'encoded': 'a&MediumSpace;b'
		},
		{
			'decoded': 'a\uD835\uDD10b',
			'encoded': 'a&Mfr;b'
		},
		{
			'decoded': 'a\uD835\uDD2Ab',
			'encoded': 'a&mfr;b'
		},
		{
			'decoded': 'a\u2127b',
			'encoded': 'a&mho;b'
		},
		{
			'decoded': 'a\xB5b',
			'encoded': 'a&micro;b'
		},
		{
			'decoded': 'a\u2AF0b',
			'encoded': 'a&midcir;b'
		},
		{
			'decoded': 'a\u2223b',
			'encoded': 'a&mid;b'
		},
		{
			'decoded': 'a\xB7b',
			'encoded': 'a&middot;b'
		},
		{
			'decoded': 'a\u229Fb',
			'encoded': 'a&minusb;b'
		},
		{
			'decoded': 'a\u2212b',
			'encoded': 'a&minus;b'
		},
		{
			'decoded': 'a\u2238b',
			'encoded': 'a&minusd;b'
		},
		{
			'decoded': 'a\u2A2Ab',
			'encoded': 'a&minusdu;b'
		},
		{
			'decoded': 'a\u2ADBb',
			'encoded': 'a&mlcp;b'
		},
		{
			'decoded': 'a\u2026b',
			'encoded': 'a&mldr;b'
		},
		{
			'decoded': 'a\u22A7b',
			'encoded': 'a&models;b'
		},
		{
			'decoded': 'a\uD835\uDD44b',
			'encoded': 'a&Mopf;b'
		},
		{
			'decoded': 'a\uD835\uDD5Eb',
			'encoded': 'a&mopf;b'
		},
		{
			'decoded': 'a\u2213b',
			'encoded': 'a&mp;b'
		},
		{
			'decoded': 'a\uD835\uDCC2b',
			'encoded': 'a&mscr;b'
		},
		{
			'decoded': 'a\u2133b',
			'encoded': 'a&Mscr;b'
		},
		{
			'decoded': 'a\u039Cb',
			'encoded': 'a&Mu;b'
		},
		{
			'decoded': 'a\u03BCb',
			'encoded': 'a&mu;b'
		},
		{
			'decoded': 'a\u22B8b',
			'encoded': 'a&mumap;b'
		},
		{
			'decoded': 'a\u0143b',
			'encoded': 'a&Nacute;b'
		},
		{
			'decoded': 'a\u0144b',
			'encoded': 'a&nacute;b'
		},
		{
			'decoded': 'a\u2220\u20D2b',
			'encoded': 'a&nang;b'
		},
		{
			'decoded': 'a\u2249b',
			'encoded': 'a&nap;b'
		},
		{
			'decoded': 'a\u2A70\u0338b',
			'encoded': 'a&napE;b'
		},
		{
			'decoded': 'a\u224B\u0338b',
			'encoded': 'a&napid;b'
		},
		{
			'decoded': 'a\u0149b',
			'encoded': 'a&napos;b'
		},
		{
			'decoded': 'a\u266Eb',
			'encoded': 'a&natur;b'
		},
		{
			'decoded': 'a\xA0b',
			'encoded': 'a&nbsp;b'
		},
		{
			'decoded': 'a\u224E\u0338b',
			'encoded': 'a&nbump;b'
		},
		{
			'decoded': 'a\u224F\u0338b',
			'encoded': 'a&nbumpe;b'
		},
		{
			'decoded': 'a\u2A43b',
			'encoded': 'a&ncap;b'
		},
		{
			'decoded': 'a\u0147b',
			'encoded': 'a&Ncaron;b'
		},
		{
			'decoded': 'a\u0148b',
			'encoded': 'a&ncaron;b'
		},
		{
			'decoded': 'a\u0145b',
			'encoded': 'a&Ncedil;b'
		},
		{
			'decoded': 'a\u0146b',
			'encoded': 'a&ncedil;b'
		},
		{
			'decoded': 'a\u2247b',
			'encoded': 'a&ncong;b'
		},
		{
			'decoded': 'a\u2A6D\u0338b',
			'encoded': 'a&ncongdot;b'
		},
		{
			'decoded': 'a\u2A42b',
			'encoded': 'a&ncup;b'
		},
		{
			'decoded': 'a\u041Db',
			'encoded': 'a&Ncy;b'
		},
		{
			'decoded': 'a\u043Db',
			'encoded': 'a&ncy;b'
		},
		{
			'decoded': 'a\u2013b',
			'encoded': 'a&ndash;b'
		},
		{
			'decoded': 'a\u2924b',
			'encoded': 'a&nearhk;b'
		},
		{
			'decoded': 'a\u2197b',
			'encoded': 'a&nearr;b'
		},
		{
			'decoded': 'a\u21D7b',
			'encoded': 'a&neArr;b'
		},
		{
			'decoded': 'a\u2260b',
			'encoded': 'a&ne;b'
		},
		{
			'decoded': 'a\u2250\u0338b',
			'encoded': 'a&nedot;b'
		},
		{
			'decoded': 'a\u2262b',
			'encoded': 'a&nequiv;b'
		},
		{
			'decoded': 'a\u2242\u0338b',
			'encoded': 'a&nesim;b'
		},
		{
			'decoded': 'a\nb',
			'encoded': 'a\nb' // `encode` shouldn’t insert `&NewLine;`
		},
		{
			'decoded': 'a\u2204b',
			'encoded': 'a&nexist;b'
		},
		{
			'decoded': 'a\uD835\uDD11b',
			'encoded': 'a&Nfr;b'
		},
		{
			'decoded': 'a\uD835\uDD2Bb',
			'encoded': 'a&nfr;b'
		},
		{
			'decoded': 'a\u2267\u0338b',
			'encoded': 'a&ngE;b'
		},
		{
			'decoded': 'a\u2271b',
			'encoded': 'a&nge;b'
		},
		{
			'decoded': 'a\u2A7E\u0338b',
			'encoded': 'a&nges;b'
		},
		{
			'decoded': 'a\u22D9\u0338b',
			'encoded': 'a&nGg;b'
		},
		{
			'decoded': 'a\u2275b',
			'encoded': 'a&ngsim;b'
		},
		{
			'decoded': 'a\u226B\u20D2b',
			'encoded': 'a&nGt;b'
		},
		{
			'decoded': 'a\u226Fb',
			'encoded': 'a&ngt;b'
		},
		{
			'decoded': 'a\u226B\u0338b',
			'encoded': 'a&nGtv;b'
		},
		{
			'decoded': 'a\u21AEb',
			'encoded': 'a&nharr;b'
		},
		{
			'decoded': 'a\u21CEb',
			'encoded': 'a&nhArr;b'
		},
		{
			'decoded': 'a\u2AF2b',
			'encoded': 'a&nhpar;b'
		},
		{
			'decoded': 'a\u220Bb',
			'encoded': 'a&ni;b'
		},
		{
			'decoded': 'a\u22FCb',
			'encoded': 'a&nis;b'
		},
		{
			'decoded': 'a\u22FAb',
			'encoded': 'a&nisd;b'
		},
		{
			'decoded': 'a\u040Ab',
			'encoded': 'a&NJcy;b'
		},
		{
			'decoded': 'a\u045Ab',
			'encoded': 'a&njcy;b'
		},
		{
			'decoded': 'a\u219Ab',
			'encoded': 'a&nlarr;b'
		},
		{
			'decoded': 'a\u21CDb',
			'encoded': 'a&nlArr;b'
		},
		{
			'decoded': 'a\u2025b',
			'encoded': 'a&nldr;b'
		},
		{
			'decoded': 'a\u2266\u0338b',
			'encoded': 'a&nlE;b'
		},
		{
			'decoded': 'a\u2270b',
			'encoded': 'a&nle;b'
		},
		{
			'decoded': 'a\u2A7D\u0338b',
			'encoded': 'a&nles;b'
		},
		{
			'decoded': 'a\u22D8\u0338b',
			'encoded': 'a&nLl;b'
		},
		{
			'decoded': 'a\u2274b',
			'encoded': 'a&nlsim;b'
		},
		{
			'decoded': 'a\u226A\u20D2b',
			'encoded': 'a&nLt;b'
		},
		{
			'decoded': 'a\u226Eb',
			'encoded': 'a&nlt;b'
		},
		{
			'decoded': 'a\u22EAb',
			'encoded': 'a&nltri;b'
		},
		{
			'decoded': 'a\u22ECb',
			'encoded': 'a&nltrie;b'
		},
		{
			'decoded': 'a\u226A\u0338b',
			'encoded': 'a&nLtv;b'
		},
		{
			'decoded': 'a\u2224b',
			'encoded': 'a&nmid;b'
		},
		{
			'decoded': 'a\u2060b',
			'encoded': 'a&NoBreak;b'
		},
		{
			'decoded': 'a\uD835\uDD5Fb',
			'encoded': 'a&nopf;b'
		},
		{
			'decoded': 'a\u2115b',
			'encoded': 'a&Nopf;b'
		},
		{
			'decoded': 'a\u2AECb',
			'encoded': 'a&Not;b'
		},
		{
			'decoded': 'a\xACb',
			'encoded': 'a&not;b'
		},
		{
			'decoded': 'a\u226Db',
			'encoded': 'a&NotCupCap;b'
		},
		{
			'decoded': 'a\u2209b',
			'encoded': 'a&notin;b'
		},
		{
			'decoded': 'a\u22F5\u0338b',
			'encoded': 'a&notindot;b'
		},
		{
			'decoded': 'a\u22F9\u0338b',
			'encoded': 'a&notinE;b'
		},
		{
			'decoded': 'a\u22F7b',
			'encoded': 'a&notinvb;b'
		},
		{
			'decoded': 'a\u22F6b',
			'encoded': 'a&notinvc;b'
		},
		{
			'decoded': 'a\u29CF\u0338b',
			'encoded': 'a&NotLeftTriangleBar;b'
		},
		{
			'decoded': 'a\u2AA2\u0338b',
			'encoded': 'a&NotNestedGreaterGreater;b'
		},
		{
			'decoded': 'a\u2AA1\u0338b',
			'encoded': 'a&NotNestedLessLess;b'
		},
		{
			'decoded': 'a\u220Cb',
			'encoded': 'a&notni;b'
		},
		{
			'decoded': 'a\u22FEb',
			'encoded': 'a&notnivb;b'
		},
		{
			'decoded': 'a\u22FDb',
			'encoded': 'a&notnivc;b'
		},
		{
			'decoded': 'a\u29D0\u0338b',
			'encoded': 'a&NotRightTriangleBar;b'
		},
		{
			'decoded': 'a\u228F\u0338b',
			'encoded': 'a&NotSquareSubset;b'
		},
		{
			'decoded': 'a\u2290\u0338b',
			'encoded': 'a&NotSquareSuperset;b'
		},
		{
			'decoded': 'a\u227F\u0338b',
			'encoded': 'a&NotSucceedsTilde;b'
		},
		{
			'decoded': 'a\u2226b',
			'encoded': 'a&npar;b'
		},
		{
			'decoded': 'a\u2AFD\u20E5b',
			'encoded': 'a&nparsl;b'
		},
		{
			'decoded': 'a\u2202\u0338b',
			'encoded': 'a&npart;b'
		},
		{
			'decoded': 'a\u2A14b',
			'encoded': 'a&npolint;b'
		},
		{
			'decoded': 'a\u2280b',
			'encoded': 'a&npr;b'
		},
		{
			'decoded': 'a\u22E0b',
			'encoded': 'a&nprcue;b'
		},
		{
			'decoded': 'a\u2AAF\u0338b',
			'encoded': 'a&npre;b'
		},
		{
			'decoded': 'a\u2933\u0338b',
			'encoded': 'a&nrarrc;b'
		},
		{
			'decoded': 'a\u219Bb',
			'encoded': 'a&nrarr;b'
		},
		{
			'decoded': 'a\u21CFb',
			'encoded': 'a&nrArr;b'
		},
		{
			'decoded': 'a\u219D\u0338b',
			'encoded': 'a&nrarrw;b'
		},
		{
			'decoded': 'a\u22EBb',
			'encoded': 'a&nrtri;b'
		},
		{
			'decoded': 'a\u22EDb',
			'encoded': 'a&nrtrie;b'
		},
		{
			'decoded': 'a\u2281b',
			'encoded': 'a&nsc;b'
		},
		{
			'decoded': 'a\u22E1b',
			'encoded': 'a&nsccue;b'
		},
		{
			'decoded': 'a\u2AB0\u0338b',
			'encoded': 'a&nsce;b'
		},
		{
			'decoded': 'a\uD835\uDCA9b',
			'encoded': 'a&Nscr;b'
		},
		{
			'decoded': 'a\uD835\uDCC3b',
			'encoded': 'a&nscr;b'
		},
		{
			'decoded': 'a\u2241b',
			'encoded': 'a&nsim;b'
		},
		{
			'decoded': 'a\u2244b',
			'encoded': 'a&nsime;b'
		},
		{
			'decoded': 'a\u22E2b',
			'encoded': 'a&nsqsube;b'
		},
		{
			'decoded': 'a\u22E3b',
			'encoded': 'a&nsqsupe;b'
		},
		{
			'decoded': 'a\u2284b',
			'encoded': 'a&nsub;b'
		},
		{
			'decoded': 'a\u2AC5\u0338b',
			'encoded': 'a&nsubE;b'
		},
		{
			'decoded': 'a\u2288b',
			'encoded': 'a&nsube;b'
		},
		{
			'decoded': 'a\u2285b',
			'encoded': 'a&nsup;b'
		},
		{
			'decoded': 'a\u2AC6\u0338b',
			'encoded': 'a&nsupE;b'
		},
		{
			'decoded': 'a\u2289b',
			'encoded': 'a&nsupe;b'
		},
		{
			'decoded': 'a\u2279b',
			'encoded': 'a&ntgl;b'
		},
		{
			'decoded': 'a\xD1b',
			'encoded': 'a&Ntilde;b'
		},
		{
			'decoded': 'a\xF1b',
			'encoded': 'a&ntilde;b'
		},
		{
			'decoded': 'a\u2278b',
			'encoded': 'a&ntlg;b'
		},
		{
			'decoded': 'a\u039Db',
			'encoded': 'a&Nu;b'
		},
		{
			'decoded': 'a\u03BDb',
			'encoded': 'a&nu;b'
		},
		{
			'decoded': 'a\u2116b',
			'encoded': 'a&numero;b'
		},
		{
			'decoded': 'a\u2007b',
			'encoded': 'a&numsp;b'
		},
		{
			'decoded': 'a\u224D\u20D2b',
			'encoded': 'a&nvap;b'
		},
		{
			'decoded': 'a\u22ACb',
			'encoded': 'a&nvdash;b'
		},
		{
			'decoded': 'a\u22ADb',
			'encoded': 'a&nvDash;b'
		},
		{
			'decoded': 'a\u22AEb',
			'encoded': 'a&nVdash;b'
		},
		{
			'decoded': 'a\u22AFb',
			'encoded': 'a&nVDash;b'
		},
		{
			'decoded': 'a\u2265\u20D2b',
			'encoded': 'a&nvge;b'
		},
		{
			'decoded': 'a>\u20D2b',
			'encoded': 'a&nvgt;b'
		},
		{
			'decoded': 'a\u2904b',
			'encoded': 'a&nvHarr;b'
		},
		{
			'decoded': 'a\u29DEb',
			'encoded': 'a&nvinfin;b'
		},
		{
			'decoded': 'a\u2902b',
			'encoded': 'a&nvlArr;b'
		},
		{
			'decoded': 'a\u2264\u20D2b',
			'encoded': 'a&nvle;b'
		},
		{
			'decoded': 'a<\u20D2b',
			'encoded': 'a&nvlt;b'
		},
		{
			'decoded': 'a\u22B4\u20D2b',
			'encoded': 'a&nvltrie;b'
		},
		{
			'decoded': 'a\u2903b',
			'encoded': 'a&nvrArr;b'
		},
		{
			'decoded': 'a\u22B5\u20D2b',
			'encoded': 'a&nvrtrie;b'
		},
		{
			'decoded': 'a\u223C\u20D2b',
			'encoded': 'a&nvsim;b'
		},
		{
			'decoded': 'a\u2923b',
			'encoded': 'a&nwarhk;b'
		},
		{
			'decoded': 'a\u2196b',
			'encoded': 'a&nwarr;b'
		},
		{
			'decoded': 'a\u21D6b',
			'encoded': 'a&nwArr;b'
		},
		{
			'decoded': 'a\u2927b',
			'encoded': 'a&nwnear;b'
		},
		{
			'decoded': 'a\xD3b',
			'encoded': 'a&Oacute;b'
		},
		{
			'decoded': 'a\xF3b',
			'encoded': 'a&oacute;b'
		},
		{
			'decoded': 'a\u229Bb',
			'encoded': 'a&oast;b'
		},
		{
			'decoded': 'a\xD4b',
			'encoded': 'a&Ocirc;b'
		},
		{
			'decoded': 'a\xF4b',
			'encoded': 'a&ocirc;b'
		},
		{
			'decoded': 'a\u229Ab',
			'encoded': 'a&ocir;b'
		},
		{
			'decoded': 'a\u041Eb',
			'encoded': 'a&Ocy;b'
		},
		{
			'decoded': 'a\u043Eb',
			'encoded': 'a&ocy;b'
		},
		{
			'decoded': 'a\u229Db',
			'encoded': 'a&odash;b'
		},
		{
			'decoded': 'a\u0150b',
			'encoded': 'a&Odblac;b'
		},
		{
			'decoded': 'a\u0151b',
			'encoded': 'a&odblac;b'
		},
		{
			'decoded': 'a\u2A38b',
			'encoded': 'a&odiv;b'
		},
		{
			'decoded': 'a\u2299b',
			'encoded': 'a&odot;b'
		},
		{
			'decoded': 'a\u29BCb',
			'encoded': 'a&odsold;b'
		},
		{
			'decoded': 'a\u0152b',
			'encoded': 'a&OElig;b'
		},
		{
			'decoded': 'a\u0153b',
			'encoded': 'a&oelig;b'
		},
		{
			'decoded': 'a\u29BFb',
			'encoded': 'a&ofcir;b'
		},
		{
			'decoded': 'a\uD835\uDD12b',
			'encoded': 'a&Ofr;b'
		},
		{
			'decoded': 'a\uD835\uDD2Cb',
			'encoded': 'a&ofr;b'
		},
		{
			'decoded': 'a\u02DBb',
			'encoded': 'a&ogon;b'
		},
		{
			'decoded': 'a\xD2b',
			'encoded': 'a&Ograve;b'
		},
		{
			'decoded': 'a\xF2b',
			'encoded': 'a&ograve;b'
		},
		{
			'decoded': 'a\u29C1b',
			'encoded': 'a&ogt;b'
		},
		{
			'decoded': 'a\u29B5b',
			'encoded': 'a&ohbar;b'
		},
		{
			'decoded': 'a\u03A9b',
			'encoded': 'a&ohm;b'
		},
		{
			'decoded': 'a\u222Eb',
			'encoded': 'a&oint;b'
		},
		{
			'decoded': 'a\u21BAb',
			'encoded': 'a&olarr;b'
		},
		{
			'decoded': 'a\u29BEb',
			'encoded': 'a&olcir;b'
		},
		{
			'decoded': 'a\u29BBb',
			'encoded': 'a&olcross;b'
		},
		{
			'decoded': 'a\u203Eb',
			'encoded': 'a&oline;b'
		},
		{
			'decoded': 'a\u29C0b',
			'encoded': 'a&olt;b'
		},
		{
			'decoded': 'a\u014Cb',
			'encoded': 'a&Omacr;b'
		},
		{
			'decoded': 'a\u014Db',
			'encoded': 'a&omacr;b'
		},
		{
			'decoded': 'a\u03C9b',
			'encoded': 'a&omega;b'
		},
		{
			'decoded': 'a\u039Fb',
			'encoded': 'a&Omicron;b'
		},
		{
			'decoded': 'a\u03BFb',
			'encoded': 'a&omicron;b'
		},
		{
			'decoded': 'a\u29B6b',
			'encoded': 'a&omid;b'
		},
		{
			'decoded': 'a\u2296b',
			'encoded': 'a&ominus;b'
		},
		{
			'decoded': 'a\uD835\uDD46b',
			'encoded': 'a&Oopf;b'
		},
		{
			'decoded': 'a\uD835\uDD60b',
			'encoded': 'a&oopf;b'
		},
		{
			'decoded': 'a\u29B7b',
			'encoded': 'a&opar;b'
		},
		{
			'decoded': 'a\u29B9b',
			'encoded': 'a&operp;b'
		},
		{
			'decoded': 'a\u2295b',
			'encoded': 'a&oplus;b'
		},
		{
			'decoded': 'a\u21BBb',
			'encoded': 'a&orarr;b'
		},
		{
			'decoded': 'a\u2A54b',
			'encoded': 'a&Or;b'
		},
		{
			'decoded': 'a\u2228b',
			'encoded': 'a&or;b'
		},
		{
			'decoded': 'a\u2A5Db',
			'encoded': 'a&ord;b'
		},
		{
			'decoded': 'a\xAAb',
			'encoded': 'a&ordf;b'
		},
		{
			'decoded': 'a\xBAb',
			'encoded': 'a&ordm;b'
		},
		{
			'decoded': 'a\u22B6b',
			'encoded': 'a&origof;b'
		},
		{
			'decoded': 'a\u2A56b',
			'encoded': 'a&oror;b'
		},
		{
			'decoded': 'a\u2A57b',
			'encoded': 'a&orslope;b'
		},
		{
			'decoded': 'a\u2A5Bb',
			'encoded': 'a&orv;b'
		},
		{
			'decoded': 'a\u24C8b',
			'encoded': 'a&oS;b'
		},
		{
			'decoded': 'a\uD835\uDCAAb',
			'encoded': 'a&Oscr;b'
		},
		{
			'decoded': 'a\u2134b',
			'encoded': 'a&oscr;b'
		},
		{
			'decoded': 'a\xD8b',
			'encoded': 'a&Oslash;b'
		},
		{
			'decoded': 'a\xF8b',
			'encoded': 'a&oslash;b'
		},
		{
			'decoded': 'a\u2298b',
			'encoded': 'a&osol;b'
		},
		{
			'decoded': 'a\xD5b',
			'encoded': 'a&Otilde;b'
		},
		{
			'decoded': 'a\xF5b',
			'encoded': 'a&otilde;b'
		},
		{
			'decoded': 'a\u2A36b',
			'encoded': 'a&otimesas;b'
		},
		{
			'decoded': 'a\u2A37b',
			'encoded': 'a&Otimes;b'
		},
		{
			'decoded': 'a\u2297b',
			'encoded': 'a&otimes;b'
		},
		{
			'decoded': 'a\xD6b',
			'encoded': 'a&Ouml;b'
		},
		{
			'decoded': 'a\xF6b',
			'encoded': 'a&ouml;b'
		},
		{
			'decoded': 'a\u233Db',
			'encoded': 'a&ovbar;b'
		},
		{
			'decoded': 'a\u23DEb',
			'encoded': 'a&OverBrace;b'
		},
		{
			'decoded': 'a\u23DCb',
			'encoded': 'a&OverParenthesis;b'
		},
		{
			'decoded': 'a\xB6b',
			'encoded': 'a&para;b'
		},
		{
			'decoded': 'a\u2225b',
			'encoded': 'a&par;b'
		},
		{
			'decoded': 'a\u2AF3b',
			'encoded': 'a&parsim;b'
		},
		{
			'decoded': 'a\u2AFDb',
			'encoded': 'a&parsl;b'
		},
		{
			'decoded': 'a\u2202b',
			'encoded': 'a&part;b'
		},
		{
			'decoded': 'a\u041Fb',
			'encoded': 'a&Pcy;b'
		},
		{
			'decoded': 'a\u043Fb',
			'encoded': 'a&pcy;b'
		},
		{
			'decoded': 'a\u2030b',
			'encoded': 'a&permil;b'
		},
		{
			'decoded': 'a\u2031b',
			'encoded': 'a&pertenk;b'
		},
		{
			'decoded': 'a\uD835\uDD13b',
			'encoded': 'a&Pfr;b'
		},
		{
			'decoded': 'a\uD835\uDD2Db',
			'encoded': 'a&pfr;b'
		},
		{
			'decoded': 'a\u03A6b',
			'encoded': 'a&Phi;b'
		},
		{
			'decoded': 'a\u03C6b',
			'encoded': 'a&phi;b'
		},
		{
			'decoded': 'a\u03D5b',
			'encoded': 'a&phiv;b'
		},
		{
			'decoded': 'a\u260Eb',
			'encoded': 'a&phone;b'
		},
		{
			'decoded': 'a\u03A0b',
			'encoded': 'a&Pi;b'
		},
		{
			'decoded': 'a\u03C0b',
			'encoded': 'a&pi;b'
		},
		{
			'decoded': 'a\u03D6b',
			'encoded': 'a&piv;b'
		},
		{
			'decoded': 'a\u210Eb',
			'encoded': 'a&planckh;b'
		},
		{
			'decoded': 'a\u2A23b',
			'encoded': 'a&plusacir;b'
		},
		{
			'decoded': 'a\u229Eb',
			'encoded': 'a&plusb;b'
		},
		{
			'decoded': 'a\u2A22b',
			'encoded': 'a&pluscir;b'
		},
		{
			'decoded': 'a\u2214b',
			'encoded': 'a&plusdo;b'
		},
		{
			'decoded': 'a\u2A25b',
			'encoded': 'a&plusdu;b'
		},
		{
			'decoded': 'a\u2A72b',
			'encoded': 'a&pluse;b'
		},
		{
			'decoded': 'a\u2A26b',
			'encoded': 'a&plussim;b'
		},
		{
			'decoded': 'a\u2A27b',
			'encoded': 'a&plustwo;b'
		},
		{
			'decoded': 'a\xB1b',
			'encoded': 'a&pm;b'
		},
		{
			'decoded': 'a\u2A15b',
			'encoded': 'a&pointint;b'
		},
		{
			'decoded': 'a\uD835\uDD61b',
			'encoded': 'a&popf;b'
		},
		{
			'decoded': 'a\u2119b',
			'encoded': 'a&Popf;b'
		},
		{
			'decoded': 'a\xA3b',
			'encoded': 'a&pound;b'
		},
		{
			'decoded': 'a\u2AB7b',
			'encoded': 'a&prap;b'
		},
		{
			'decoded': 'a\u2ABBb',
			'encoded': 'a&Pr;b'
		},
		{
			'decoded': 'a\u227Ab',
			'encoded': 'a&pr;b'
		},
		{
			'decoded': 'a\u227Cb',
			'encoded': 'a&prcue;b'
		},
		{
			'decoded': 'a\u2AAFb',
			'encoded': 'a&pre;b'
		},
		{
			'decoded': 'a\u2AB3b',
			'encoded': 'a&prE;b'
		},
		{
			'decoded': 'a\u2032b',
			'encoded': 'a&prime;b'
		},
		{
			'decoded': 'a\u2033b',
			'encoded': 'a&Prime;b'
		},
		{
			'decoded': 'a\u2AB9b',
			'encoded': 'a&prnap;b'
		},
		{
			'decoded': 'a\u2AB5b',
			'encoded': 'a&prnE;b'
		},
		{
			'decoded': 'a\u22E8b',
			'encoded': 'a&prnsim;b'
		},
		{
			'decoded': 'a\u220Fb',
			'encoded': 'a&prod;b'
		},
		{
			'decoded': 'a\u232Eb',
			'encoded': 'a&profalar;b'
		},
		{
			'decoded': 'a\u2312b',
			'encoded': 'a&profline;b'
		},
		{
			'decoded': 'a\u2313b',
			'encoded': 'a&profsurf;b'
		},
		{
			'decoded': 'a\u221Db',
			'encoded': 'a&prop;b'
		},
		{
			'decoded': 'a\u227Eb',
			'encoded': 'a&prsim;b'
		},
		{
			'decoded': 'a\u22B0b',
			'encoded': 'a&prurel;b'
		},
		{
			'decoded': 'a\uD835\uDCABb',
			'encoded': 'a&Pscr;b'
		},
		{
			'decoded': 'a\uD835\uDCC5b',
			'encoded': 'a&pscr;b'
		},
		{
			'decoded': 'a\u03A8b',
			'encoded': 'a&Psi;b'
		},
		{
			'decoded': 'a\u03C8b',
			'encoded': 'a&psi;b'
		},
		{
			'decoded': 'a\u2008b',
			'encoded': 'a&puncsp;b'
		},
		{
			'decoded': 'a\uD835\uDD14b',
			'encoded': 'a&Qfr;b'
		},
		{
			'decoded': 'a\uD835\uDD2Eb',
			'encoded': 'a&qfr;b'
		},
		{
			'decoded': 'a\u2A0Cb',
			'encoded': 'a&qint;b'
		},
		{
			'decoded': 'a\uD835\uDD62b',
			'encoded': 'a&qopf;b'
		},
		{
			'decoded': 'a\u211Ab',
			'encoded': 'a&Qopf;b'
		},
		{
			'decoded': 'a\u2057b',
			'encoded': 'a&qprime;b'
		},
		{
			'decoded': 'a\uD835\uDCACb',
			'encoded': 'a&Qscr;b'
		},
		{
			'decoded': 'a\uD835\uDCC6b',
			'encoded': 'a&qscr;b'
		},
		{
			'decoded': 'a\u2A16b',
			'encoded': 'a&quatint;b'
		},
		{
			'decoded': 'a"b',
			'encoded': 'a&quot;b'
		},
		{
			'decoded': 'a\u21DBb',
			'encoded': 'a&rAarr;b'
		},
		{
			'decoded': 'a\u223D\u0331b',
			'encoded': 'a&race;b'
		},
		{
			'decoded': 'a\u0154b',
			'encoded': 'a&Racute;b'
		},
		{
			'decoded': 'a\u0155b',
			'encoded': 'a&racute;b'
		},
		{
			'decoded': 'a\u29B3b',
			'encoded': 'a&raemptyv;b'
		},
		{
			'decoded': 'a\u27E9b',
			'encoded': 'a&rang;b'
		},
		{
			'decoded': 'a\u27EBb',
			'encoded': 'a&Rang;b'
		},
		{
			'decoded': 'a\u2992b',
			'encoded': 'a&rangd;b'
		},
		{
			'decoded': 'a\u29A5b',
			'encoded': 'a&range;b'
		},
		{
			'decoded': 'a\xBBb',
			'encoded': 'a&raquo;b'
		},
		{
			'decoded': 'a\u2975b',
			'encoded': 'a&rarrap;b'
		},
		{
			'decoded': 'a\u21E5b',
			'encoded': 'a&rarrb;b'
		},
		{
			'decoded': 'a\u2920b',
			'encoded': 'a&rarrbfs;b'
		},
		{
			'decoded': 'a\u2933b',
			'encoded': 'a&rarrc;b'
		},
		{
			'decoded': 'a\u2192b',
			'encoded': 'a&rarr;b'
		},
		{
			'decoded': 'a\u21A0b',
			'encoded': 'a&Rarr;b'
		},
		{
			'decoded': 'a\u21D2b',
			'encoded': 'a&rArr;b'
		},
		{
			'decoded': 'a\u291Eb',
			'encoded': 'a&rarrfs;b'
		},
		{
			'decoded': 'a\u21AAb',
			'encoded': 'a&rarrhk;b'
		},
		{
			'decoded': 'a\u21ACb',
			'encoded': 'a&rarrlp;b'
		},
		{
			'decoded': 'a\u2945b',
			'encoded': 'a&rarrpl;b'
		},
		{
			'decoded': 'a\u2974b',
			'encoded': 'a&rarrsim;b'
		},
		{
			'decoded': 'a\u2916b',
			'encoded': 'a&Rarrtl;b'
		},
		{
			'decoded': 'a\u21A3b',
			'encoded': 'a&rarrtl;b'
		},
		{
			'decoded': 'a\u219Db',
			'encoded': 'a&rarrw;b'
		},
		{
			'decoded': 'a\u291Ab',
			'encoded': 'a&ratail;b'
		},
		{
			'decoded': 'a\u291Cb',
			'encoded': 'a&rAtail;b'
		},
		{
			'decoded': 'a\u2236b',
			'encoded': 'a&ratio;b'
		},
		{
			'decoded': 'a\u290Db',
			'encoded': 'a&rbarr;b'
		},
		{
			'decoded': 'a\u290Fb',
			'encoded': 'a&rBarr;b'
		},
		{
			'decoded': 'a\u2910b',
			'encoded': 'a&RBarr;b'
		},
		{
			'decoded': 'a\u2773b',
			'encoded': 'a&rbbrk;b'
		},
		{
			'decoded': 'a\u298Cb',
			'encoded': 'a&rbrke;b'
		},
		{
			'decoded': 'a\u298Eb',
			'encoded': 'a&rbrksld;b'
		},
		{
			'decoded': 'a\u2990b',
			'encoded': 'a&rbrkslu;b'
		},
		{
			'decoded': 'a\u0158b',
			'encoded': 'a&Rcaron;b'
		},
		{
			'decoded': 'a\u0159b',
			'encoded': 'a&rcaron;b'
		},
		{
			'decoded': 'a\u0156b',
			'encoded': 'a&Rcedil;b'
		},
		{
			'decoded': 'a\u0157b',
			'encoded': 'a&rcedil;b'
		},
		{
			'decoded': 'a\u2309b',
			'encoded': 'a&rceil;b'
		},
		{
			'decoded': 'a\u0420b',
			'encoded': 'a&Rcy;b'
		},
		{
			'decoded': 'a\u0440b',
			'encoded': 'a&rcy;b'
		},
		{
			'decoded': 'a\u2937b',
			'encoded': 'a&rdca;b'
		},
		{
			'decoded': 'a\u2969b',
			'encoded': 'a&rdldhar;b'
		},
		{
			'decoded': 'a\u201Db',
			'encoded': 'a&rdquo;b'
		},
		{
			'decoded': 'a\u21B3b',
			'encoded': 'a&rdsh;b'
		},
		{
			'decoded': 'a\u211Cb',
			'encoded': 'a&Re;b'
		},
		{
			'decoded': 'a\u25ADb',
			'encoded': 'a&rect;b'
		},
		{
			'decoded': 'a\xAEb',
			'encoded': 'a&reg;b'
		},
		{
			'decoded': 'a\u297Db',
			'encoded': 'a&rfisht;b'
		},
		{
			'decoded': 'a\u230Bb',
			'encoded': 'a&rfloor;b'
		},
		{
			'decoded': 'a\uD835\uDD2Fb',
			'encoded': 'a&rfr;b'
		},
		{
			'decoded': 'a\u2964b',
			'encoded': 'a&rHar;b'
		},
		{
			'decoded': 'a\u21C1b',
			'encoded': 'a&rhard;b'
		},
		{
			'decoded': 'a\u21C0b',
			'encoded': 'a&rharu;b'
		},
		{
			'decoded': 'a\u296Cb',
			'encoded': 'a&rharul;b'
		},
		{
			'decoded': 'a\u03A1b',
			'encoded': 'a&Rho;b'
		},
		{
			'decoded': 'a\u03C1b',
			'encoded': 'a&rho;b'
		},
		{
			'decoded': 'a\u03F1b',
			'encoded': 'a&rhov;b'
		},
		{
			'decoded': 'a\u295Db',
			'encoded': 'a&RightDownTeeVector;b'
		},
		{
			'decoded': 'a\u2955b',
			'encoded': 'a&RightDownVectorBar;b'
		},
		{
			'decoded': 'a\u295Bb',
			'encoded': 'a&RightTeeVector;b'
		},
		{
			'decoded': 'a\u29D0b',
			'encoded': 'a&RightTriangleBar;b'
		},
		{
			'decoded': 'a\u294Fb',
			'encoded': 'a&RightUpDownVector;b'
		},
		{
			'decoded': 'a\u295Cb',
			'encoded': 'a&RightUpTeeVector;b'
		},
		{
			'decoded': 'a\u2954b',
			'encoded': 'a&RightUpVectorBar;b'
		},
		{
			'decoded': 'a\u2953b',
			'encoded': 'a&RightVectorBar;b'
		},
		{
			'decoded': 'a\u02DAb',
			'encoded': 'a&ring;b'
		},
		{
			'decoded': 'a\u21C4b',
			'encoded': 'a&rlarr;b'
		},
		{
			'decoded': 'a\u21CCb',
			'encoded': 'a&rlhar;b'
		},
		{
			'decoded': 'a\u200Fb',
			'encoded': 'a&rlm;b'
		},
		{
			'decoded': 'a\u23B1b',
			'encoded': 'a&rmoust;b'
		},
		{
			'decoded': 'a\u2AEEb',
			'encoded': 'a&rnmid;b'
		},
		{
			'decoded': 'a\u27EDb',
			'encoded': 'a&roang;b'
		},
		{
			'decoded': 'a\u21FEb',
			'encoded': 'a&roarr;b'
		},
		{
			'decoded': 'a\u27E7b',
			'encoded': 'a&robrk;b'
		},
		{
			'decoded': 'a\u2986b',
			'encoded': 'a&ropar;b'
		},
		{
			'decoded': 'a\uD835\uDD63b',
			'encoded': 'a&ropf;b'
		},
		{
			'decoded': 'a\u211Db',
			'encoded': 'a&Ropf;b'
		},
		{
			'decoded': 'a\u2A2Eb',
			'encoded': 'a&roplus;b'
		},
		{
			'decoded': 'a\u2A35b',
			'encoded': 'a&rotimes;b'
		},
		{
			'decoded': 'a\u2970b',
			'encoded': 'a&RoundImplies;b'
		},
		{
			'decoded': 'a\u2994b',
			'encoded': 'a&rpargt;b'
		},
		{
			'decoded': 'a\u2A12b',
			'encoded': 'a&rppolint;b'
		},
		{
			'decoded': 'a\u21C9b',
			'encoded': 'a&rrarr;b'
		},
		{
			'decoded': 'a\u203Ab',
			'encoded': 'a&rsaquo;b'
		},
		{
			'decoded': 'a\uD835\uDCC7b',
			'encoded': 'a&rscr;b'
		},
		{
			'decoded': 'a\u211Bb',
			'encoded': 'a&Rscr;b'
		},
		{
			'decoded': 'a\u21B1b',
			'encoded': 'a&rsh;b'
		},
		{
			'decoded': 'a\u2019b',
			'encoded': 'a&rsquo;b'
		},
		{
			'decoded': 'a\u22CCb',
			'encoded': 'a&rthree;b'
		},
		{
			'decoded': 'a\u22CAb',
			'encoded': 'a&rtimes;b'
		},
		{
			'decoded': 'a\u25B9b',
			'encoded': 'a&rtri;b'
		},
		{
			'decoded': 'a\u22B5b',
			'encoded': 'a&rtrie;b'
		},
		{
			'decoded': 'a\u25B8b',
			'encoded': 'a&rtrif;b'
		},
		{
			'decoded': 'a\u29CEb',
			'encoded': 'a&rtriltri;b'
		},
		{
			'decoded': 'a\u29F4b',
			'encoded': 'a&RuleDelayed;b'
		},
		{
			'decoded': 'a\u2968b',
			'encoded': 'a&ruluhar;b'
		},
		{
			'decoded': 'a\u211Eb',
			'encoded': 'a&rx;b'
		},
		{
			'decoded': 'a\u015Ab',
			'encoded': 'a&Sacute;b'
		},
		{
			'decoded': 'a\u015Bb',
			'encoded': 'a&sacute;b'
		},
		{
			'decoded': 'a\u201Ab',
			'encoded': 'a&sbquo;b'
		},
		{
			'decoded': 'a\u2AB8b',
			'encoded': 'a&scap;b'
		},
		{
			'decoded': 'a\u0160b',
			'encoded': 'a&Scaron;b'
		},
		{
			'decoded': 'a\u0161b',
			'encoded': 'a&scaron;b'
		},
		{
			'decoded': 'a\u2ABCb',
			'encoded': 'a&Sc;b'
		},
		{
			'decoded': 'a\u227Bb',
			'encoded': 'a&sc;b'
		},
		{
			'decoded': 'a\u227Db',
			'encoded': 'a&sccue;b'
		},
		{
			'decoded': 'a\u2AB0b',
			'encoded': 'a&sce;b'
		},
		{
			'decoded': 'a\u2AB4b',
			'encoded': 'a&scE;b'
		},
		{
			'decoded': 'a\u015Eb',
			'encoded': 'a&Scedil;b'
		},
		{
			'decoded': 'a\u015Fb',
			'encoded': 'a&scedil;b'
		},
		{
			'decoded': 'a\u015Cb',
			'encoded': 'a&Scirc;b'
		},
		{
			'decoded': 'a\u015Db',
			'encoded': 'a&scirc;b'
		},
		{
			'decoded': 'a\u2ABAb',
			'encoded': 'a&scnap;b'
		},
		{
			'decoded': 'a\u2AB6b',
			'encoded': 'a&scnE;b'
		},
		{
			'decoded': 'a\u22E9b',
			'encoded': 'a&scnsim;b'
		},
		{
			'decoded': 'a\u2A13b',
			'encoded': 'a&scpolint;b'
		},
		{
			'decoded': 'a\u227Fb',
			'encoded': 'a&scsim;b'
		},
		{
			'decoded': 'a\u0421b',
			'encoded': 'a&Scy;b'
		},
		{
			'decoded': 'a\u0441b',
			'encoded': 'a&scy;b'
		},
		{
			'decoded': 'a\u22A1b',
			'encoded': 'a&sdotb;b'
		},
		{
			'decoded': 'a\u22C5b',
			'encoded': 'a&sdot;b'
		},
		{
			'decoded': 'a\u2A66b',
			'encoded': 'a&sdote;b'
		},
		{
			'decoded': 'a\u2925b',
			'encoded': 'a&searhk;b'
		},
		{
			'decoded': 'a\u2198b',
			'encoded': 'a&searr;b'
		},
		{
			'decoded': 'a\u21D8b',
			'encoded': 'a&seArr;b'
		},
		{
			'decoded': 'a\xA7b',
			'encoded': 'a&sect;b'
		},
		{
			'decoded': 'a\u2216b',
			'encoded': 'a&setmn;b'
		},
		{
			'decoded': 'a\u2736b',
			'encoded': 'a&sext;b'
		},
		{
			'decoded': 'a\uD835\uDD16b',
			'encoded': 'a&Sfr;b'
		},
		{
			'decoded': 'a\uD835\uDD30b',
			'encoded': 'a&sfr;b'
		},
		{
			'decoded': 'a\u266Fb',
			'encoded': 'a&sharp;b'
		},
		{
			'decoded': 'a\u0429b',
			'encoded': 'a&SHCHcy;b'
		},
		{
			'decoded': 'a\u0449b',
			'encoded': 'a&shchcy;b'
		},
		{
			'decoded': 'a\u0428b',
			'encoded': 'a&SHcy;b'
		},
		{
			'decoded': 'a\u0448b',
			'encoded': 'a&shcy;b'
		},
		{
			'decoded': 'a\xADb',
			'encoded': 'a&shy;b'
		},
		{
			'decoded': 'a\u03A3b',
			'encoded': 'a&Sigma;b'
		},
		{
			'decoded': 'a\u03C3b',
			'encoded': 'a&sigma;b'
		},
		{
			'decoded': 'a\u03C2b',
			'encoded': 'a&sigmaf;b'
		},
		{
			'decoded': 'a\u223Cb',
			'encoded': 'a&sim;b'
		},
		{
			'decoded': 'a\u2A6Ab',
			'encoded': 'a&simdot;b'
		},
		{
			'decoded': 'a\u2243b',
			'encoded': 'a&sime;b'
		},
		{
			'decoded': 'a\u2A9Eb',
			'encoded': 'a&simg;b'
		},
		{
			'decoded': 'a\u2AA0b',
			'encoded': 'a&simgE;b'
		},
		{
			'decoded': 'a\u2A9Db',
			'encoded': 'a&siml;b'
		},
		{
			'decoded': 'a\u2A9Fb',
			'encoded': 'a&simlE;b'
		},
		{
			'decoded': 'a\u2246b',
			'encoded': 'a&simne;b'
		},
		{
			'decoded': 'a\u2A24b',
			'encoded': 'a&simplus;b'
		},
		{
			'decoded': 'a\u2972b',
			'encoded': 'a&simrarr;b'
		},
		{
			'decoded': 'a\u2A33b',
			'encoded': 'a&smashp;b'
		},
		{
			'decoded': 'a\u29E4b',
			'encoded': 'a&smeparsl;b'
		},
		{
			'decoded': 'a\u2323b',
			'encoded': 'a&smile;b'
		},
		{
			'decoded': 'a\u2AAAb',
			'encoded': 'a&smt;b'
		},
		{
			'decoded': 'a\u2AACb',
			'encoded': 'a&smte;b'
		},
		{
			'decoded': 'a\u2AAC\uFE00b',
			'encoded': 'a&smtes;b'
		},
		{
			'decoded': 'a\u042Cb',
			'encoded': 'a&SOFTcy;b'
		},
		{
			'decoded': 'a\u044Cb',
			'encoded': 'a&softcy;b'
		},
		{
			'decoded': 'a\u233Fb',
			'encoded': 'a&solbar;b'
		},
		{
			'decoded': 'a\u29C4b',
			'encoded': 'a&solb;b'
		},
		{
			'decoded': 'a\uD835\uDD4Ab',
			'encoded': 'a&Sopf;b'
		},
		{
			'decoded': 'a\uD835\uDD64b',
			'encoded': 'a&sopf;b'
		},
		{
			'decoded': 'a\u2660b',
			'encoded': 'a&spades;b'
		},
		{
			'decoded': 'a\u2293b',
			'encoded': 'a&sqcap;b'
		},
		{
			'decoded': 'a\u2293\uFE00b',
			'encoded': 'a&sqcaps;b'
		},
		{
			'decoded': 'a\u2294b',
			'encoded': 'a&sqcup;b'
		},
		{
			'decoded': 'a\u2294\uFE00b',
			'encoded': 'a&sqcups;b'
		},
		{
			'decoded': 'a\u221Ab',
			'encoded': 'a&Sqrt;b'
		},
		{
			'decoded': 'a\u228Fb',
			'encoded': 'a&sqsub;b'
		},
		{
			'decoded': 'a\u2291b',
			'encoded': 'a&sqsube;b'
		},
		{
			'decoded': 'a\u2290b',
			'encoded': 'a&sqsup;b'
		},
		{
			'decoded': 'a\u2292b',
			'encoded': 'a&sqsupe;b'
		},
		{
			'decoded': 'a\u25A1b',
			'encoded': 'a&squ;b'
		},
		{
			'decoded': 'a\u25AAb',
			'encoded': 'a&squf;b'
		},
		{
			'decoded': 'a\uD835\uDCAEb',
			'encoded': 'a&Sscr;b'
		},
		{
			'decoded': 'a\uD835\uDCC8b',
			'encoded': 'a&sscr;b'
		},
		{
			'decoded': 'a\u22C6b',
			'encoded': 'a&Star;b'
		},
		{
			'decoded': 'a\u2606b',
			'encoded': 'a&star;b'
		},
		{
			'decoded': 'a\u2605b',
			'encoded': 'a&starf;b'
		},
		{
			'decoded': 'a\u2282b',
			'encoded': 'a&sub;b'
		},
		{
			'decoded': 'a\u22D0b',
			'encoded': 'a&Sub;b'
		},
		{
			'decoded': 'a\u2ABDb',
			'encoded': 'a&subdot;b'
		},
		{
			'decoded': 'a\u2AC5b',
			'encoded': 'a&subE;b'
		},
		{
			'decoded': 'a\u2286b',
			'encoded': 'a&sube;b'
		},
		{
			'decoded': 'a\u2AC3b',
			'encoded': 'a&subedot;b'
		},
		{
			'decoded': 'a\u2AC1b',
			'encoded': 'a&submult;b'
		},
		{
			'decoded': 'a\u2ACBb',
			'encoded': 'a&subnE;b'
		},
		{
			'decoded': 'a\u228Ab',
			'encoded': 'a&subne;b'
		},
		{
			'decoded': 'a\u2ABFb',
			'encoded': 'a&subplus;b'
		},
		{
			'decoded': 'a\u2979b',
			'encoded': 'a&subrarr;b'
		},
		{
			'decoded': 'a\u2AC7b',
			'encoded': 'a&subsim;b'
		},
		{
			'decoded': 'a\u2AD5b',
			'encoded': 'a&subsub;b'
		},
		{
			'decoded': 'a\u2AD3b',
			'encoded': 'a&subsup;b'
		},
		{
			'decoded': 'a\u2211b',
			'encoded': 'a&sum;b'
		},
		{
			'decoded': 'a\u266Ab',
			'encoded': 'a&sung;b'
		},
		{
			'decoded': 'a\xB9b',
			'encoded': 'a&sup1;b'
		},
		{
			'decoded': 'a\xB2b',
			'encoded': 'a&sup2;b'
		},
		{
			'decoded': 'a\xB3b',
			'encoded': 'a&sup3;b'
		},
		{
			'decoded': 'a\u2283b',
			'encoded': 'a&sup;b'
		},
		{
			'decoded': 'a\u22D1b',
			'encoded': 'a&Sup;b'
		},
		{
			'decoded': 'a\u2ABEb',
			'encoded': 'a&supdot;b'
		},
		{
			'decoded': 'a\u2AD8b',
			'encoded': 'a&supdsub;b'
		},
		{
			'decoded': 'a\u2AC6b',
			'encoded': 'a&supE;b'
		},
		{
			'decoded': 'a\u2287b',
			'encoded': 'a&supe;b'
		},
		{
			'decoded': 'a\u2AC4b',
			'encoded': 'a&supedot;b'
		},
		{
			'decoded': 'a\u27C9b',
			'encoded': 'a&suphsol;b'
		},
		{
			'decoded': 'a\u2AD7b',
			'encoded': 'a&suphsub;b'
		},
		{
			'decoded': 'a\u297Bb',
			'encoded': 'a&suplarr;b'
		},
		{
			'decoded': 'a\u2AC2b',
			'encoded': 'a&supmult;b'
		},
		{
			'decoded': 'a\u2ACCb',
			'encoded': 'a&supnE;b'
		},
		{
			'decoded': 'a\u228Bb',
			'encoded': 'a&supne;b'
		},
		{
			'decoded': 'a\u2AC0b',
			'encoded': 'a&supplus;b'
		},
		{
			'decoded': 'a\u2AC8b',
			'encoded': 'a&supsim;b'
		},
		{
			'decoded': 'a\u2AD4b',
			'encoded': 'a&supsub;b'
		},
		{
			'decoded': 'a\u2AD6b',
			'encoded': 'a&supsup;b'
		},
		{
			'decoded': 'a\u2926b',
			'encoded': 'a&swarhk;b'
		},
		{
			'decoded': 'a\u2199b',
			'encoded': 'a&swarr;b'
		},
		{
			'decoded': 'a\u21D9b',
			'encoded': 'a&swArr;b'
		},
		{
			'decoded': 'a\u292Ab',
			'encoded': 'a&swnwar;b'
		},
		{
			'decoded': 'a\xDFb',
			'encoded': 'a&szlig;b'
		},
		{
			'decoded': 'a\u2316b',
			'encoded': 'a&target;b'
		},
		{
			'decoded': 'a\u03A4b',
			'encoded': 'a&Tau;b'
		},
		{
			'decoded': 'a\u03C4b',
			'encoded': 'a&tau;b'
		},
		{
			'decoded': 'a\u23B4b',
			'encoded': 'a&tbrk;b'
		},
		{
			'decoded': 'a\u0164b',
			'encoded': 'a&Tcaron;b'
		},
		{
			'decoded': 'a\u0165b',
			'encoded': 'a&tcaron;b'
		},
		{
			'decoded': 'a\u0162b',
			'encoded': 'a&Tcedil;b'
		},
		{
			'decoded': 'a\u0163b',
			'encoded': 'a&tcedil;b'
		},
		{
			'decoded': 'a\u0422b',
			'encoded': 'a&Tcy;b'
		},
		{
			'decoded': 'a\u0442b',
			'encoded': 'a&tcy;b'
		},
		{
			'decoded': 'a\u20DBb',
			'encoded': 'a&tdot;b'
		},
		{
			'decoded': 'a\u2315b',
			'encoded': 'a&telrec;b'
		},
		{
			'decoded': 'a\uD835\uDD17b',
			'encoded': 'a&Tfr;b'
		},
		{
			'decoded': 'a\uD835\uDD31b',
			'encoded': 'a&tfr;b'
		},
		{
			'decoded': 'a\u2234b',
			'encoded': 'a&there4;b'
		},
		{
			'decoded': 'a\u0398b',
			'encoded': 'a&Theta;b'
		},
		{
			'decoded': 'a\u03B8b',
			'encoded': 'a&theta;b'
		},
		{
			'decoded': 'a\u03D1b',
			'encoded': 'a&thetav;b'
		},
		{
			'decoded': 'a\u205F\u200Ab',
			'encoded': 'a&ThickSpace;b'
		},
		{
			'decoded': 'a\u2009b',
			'encoded': 'a&thinsp;b'
		},
		{
			'decoded': 'a\xDEb',
			'encoded': 'a&THORN;b'
		},
		{
			'decoded': 'a\xFEb',
			'encoded': 'a&thorn;b'
		},
		{
			'decoded': 'a\u02DCb',
			'encoded': 'a&tilde;b'
		},
		{
			'decoded': 'a\u2A31b',
			'encoded': 'a&timesbar;b'
		},
		{
			'decoded': 'a\u22A0b',
			'encoded': 'a&timesb;b'
		},
		{
			'decoded': 'a\xD7b',
			'encoded': 'a&times;b'
		},
		{
			'decoded': 'a\u2A30b',
			'encoded': 'a&timesd;b'
		},
		{
			'decoded': 'a\u222Db',
			'encoded': 'a&tint;b'
		},
		{
			'decoded': 'a\u2928b',
			'encoded': 'a&toea;b'
		},
		{
			'decoded': 'a\u2336b',
			'encoded': 'a&topbot;b'
		},
		{
			'decoded': 'a\u2AF1b',
			'encoded': 'a&topcir;b'
		},
		{
			'decoded': 'a\u22A4b',
			'encoded': 'a&top;b'
		},
		{
			'decoded': 'a\uD835\uDD4Bb',
			'encoded': 'a&Topf;b'
		},
		{
			'decoded': 'a\uD835\uDD65b',
			'encoded': 'a&topf;b'
		},
		{
			'decoded': 'a\u2ADAb',
			'encoded': 'a&topfork;b'
		},
		{
			'decoded': 'a\u2929b',
			'encoded': 'a&tosa;b'
		},
		{
			'decoded': 'a\u2034b',
			'encoded': 'a&tprime;b'
		},
		{
			'decoded': 'a\u2122b',
			'encoded': 'a&trade;b'
		},
		{
			'decoded': 'a\u25ECb',
			'encoded': 'a&tridot;b'
		},
		{
			'decoded': 'a\u225Cb',
			'encoded': 'a&trie;b'
		},
		{
			'decoded': 'a\u2A3Ab',
			'encoded': 'a&triminus;b'
		},
		{
			'decoded': 'a\u2A39b',
			'encoded': 'a&triplus;b'
		},
		{
			'decoded': 'a\u29CDb',
			'encoded': 'a&trisb;b'
		},
		{
			'decoded': 'a\u2A3Bb',
			'encoded': 'a&tritime;b'
		},
		{
			'decoded': 'a\u23E2b',
			'encoded': 'a&trpezium;b'
		},
		{
			'decoded': 'a\uD835\uDCAFb',
			'encoded': 'a&Tscr;b'
		},
		{
			'decoded': 'a\uD835\uDCC9b',
			'encoded': 'a&tscr;b'
		},
		{
			'decoded': 'a\u0426b',
			'encoded': 'a&TScy;b'
		},
		{
			'decoded': 'a\u0446b',
			'encoded': 'a&tscy;b'
		},
		{
			'decoded': 'a\u040Bb',
			'encoded': 'a&TSHcy;b'
		},
		{
			'decoded': 'a\u045Bb',
			'encoded': 'a&tshcy;b'
		},
		{
			'decoded': 'a\u0166b',
			'encoded': 'a&Tstrok;b'
		},
		{
			'decoded': 'a\u0167b',
			'encoded': 'a&tstrok;b'
		},
		{
			'decoded': 'a\u226Cb',
			'encoded': 'a&twixt;b'
		},
		{
			'decoded': 'a\xDAb',
			'encoded': 'a&Uacute;b'
		},
		{
			'decoded': 'a\xFAb',
			'encoded': 'a&uacute;b'
		},
		{
			'decoded': 'a\u2191b',
			'encoded': 'a&uarr;b'
		},
		{
			'decoded': 'a\u219Fb',
			'encoded': 'a&Uarr;b'
		},
		{
			'decoded': 'a\u21D1b',
			'encoded': 'a&uArr;b'
		},
		{
			'decoded': 'a\u2949b',
			'encoded': 'a&Uarrocir;b'
		},
		{
			'decoded': 'a\u040Eb',
			'encoded': 'a&Ubrcy;b'
		},
		{
			'decoded': 'a\u045Eb',
			'encoded': 'a&ubrcy;b'
		},
		{
			'decoded': 'a\u016Cb',
			'encoded': 'a&Ubreve;b'
		},
		{
			'decoded': 'a\u016Db',
			'encoded': 'a&ubreve;b'
		},
		{
			'decoded': 'a\xDBb',
			'encoded': 'a&Ucirc;b'
		},
		{
			'decoded': 'a\xFBb',
			'encoded': 'a&ucirc;b'
		},
		{
			'decoded': 'a\u0423b',
			'encoded': 'a&Ucy;b'
		},
		{
			'decoded': 'a\u0443b',
			'encoded': 'a&ucy;b'
		},
		{
			'decoded': 'a\u21C5b',
			'encoded': 'a&udarr;b'
		},
		{
			'decoded': 'a\u0170b',
			'encoded': 'a&Udblac;b'
		},
		{
			'decoded': 'a\u0171b',
			'encoded': 'a&udblac;b'
		},
		{
			'decoded': 'a\u296Eb',
			'encoded': 'a&udhar;b'
		},
		{
			'decoded': 'a\u297Eb',
			'encoded': 'a&ufisht;b'
		},
		{
			'decoded': 'a\uD835\uDD18b',
			'encoded': 'a&Ufr;b'
		},
		{
			'decoded': 'a\uD835\uDD32b',
			'encoded': 'a&ufr;b'
		},
		{
			'decoded': 'a\xD9b',
			'encoded': 'a&Ugrave;b'
		},
		{
			'decoded': 'a\xF9b',
			'encoded': 'a&ugrave;b'
		},
		{
			'decoded': 'a\u2963b',
			'encoded': 'a&uHar;b'
		},
		{
			'decoded': 'a\u21BFb',
			'encoded': 'a&uharl;b'
		},
		{
			'decoded': 'a\u21BEb',
			'encoded': 'a&uharr;b'
		},
		{
			'decoded': 'a\u2580b',
			'encoded': 'a&uhblk;b'
		},
		{
			'decoded': 'a\u231Cb',
			'encoded': 'a&ulcorn;b'
		},
		{
			'decoded': 'a\u230Fb',
			'encoded': 'a&ulcrop;b'
		},
		{
			'decoded': 'a\u25F8b',
			'encoded': 'a&ultri;b'
		},
		{
			'decoded': 'a\u016Ab',
			'encoded': 'a&Umacr;b'
		},
		{
			'decoded': 'a\u016Bb',
			'encoded': 'a&umacr;b'
		},
		{
			'decoded': 'a\u23DFb',
			'encoded': 'a&UnderBrace;b'
		},
		{
			'decoded': 'a\u23DDb',
			'encoded': 'a&UnderParenthesis;b'
		},
		{
			'decoded': 'a\u0172b',
			'encoded': 'a&Uogon;b'
		},
		{
			'decoded': 'a\u0173b',
			'encoded': 'a&uogon;b'
		},
		{
			'decoded': 'a\uD835\uDD4Cb',
			'encoded': 'a&Uopf;b'
		},
		{
			'decoded': 'a\uD835\uDD66b',
			'encoded': 'a&uopf;b'
		},
		{
			'decoded': 'a\u2912b',
			'encoded': 'a&UpArrowBar;b'
		},
		{
			'decoded': 'a\u228Eb',
			'encoded': 'a&uplus;b'
		},
		{
			'decoded': 'a\u03C5b',
			'encoded': 'a&upsi;b'
		},
		{
			'decoded': 'a\u03D2b',
			'encoded': 'a&Upsi;b'
		},
		{
			'decoded': 'a\u03A5b',
			'encoded': 'a&Upsilon;b'
		},
		{
			'decoded': 'a\u231Db',
			'encoded': 'a&urcorn;b'
		},
		{
			'decoded': 'a\u230Eb',
			'encoded': 'a&urcrop;b'
		},
		{
			'decoded': 'a\u016Eb',
			'encoded': 'a&Uring;b'
		},
		{
			'decoded': 'a\u016Fb',
			'encoded': 'a&uring;b'
		},
		{
			'decoded': 'a\u25F9b',
			'encoded': 'a&urtri;b'
		},
		{
			'decoded': 'a\uD835\uDCB0b',
			'encoded': 'a&Uscr;b'
		},
		{
			'decoded': 'a\uD835\uDCCAb',
			'encoded': 'a&uscr;b'
		},
		{
			'decoded': 'a\u22F0b',
			'encoded': 'a&utdot;b'
		},
		{
			'decoded': 'a\u0168b',
			'encoded': 'a&Utilde;b'
		},
		{
			'decoded': 'a\u0169b',
			'encoded': 'a&utilde;b'
		},
		{
			'decoded': 'a\u25B5b',
			'encoded': 'a&utri;b'
		},
		{
			'decoded': 'a\u25B4b',
			'encoded': 'a&utrif;b'
		},
		{
			'decoded': 'a\u21C8b',
			'encoded': 'a&uuarr;b'
		},
		{
			'decoded': 'a\xDCb',
			'encoded': 'a&Uuml;b'
		},
		{
			'decoded': 'a\xFCb',
			'encoded': 'a&uuml;b'
		},
		{
			'decoded': 'a\u29A7b',
			'encoded': 'a&uwangle;b'
		},
		{
			'decoded': 'a\u299Cb',
			'encoded': 'a&vangrt;b'
		},
		{
			'decoded': 'a\u2195b',
			'encoded': 'a&varr;b'
		},
		{
			'decoded': 'a\u21D5b',
			'encoded': 'a&vArr;b'
		},
		{
			'decoded': 'a\u2AE8b',
			'encoded': 'a&vBar;b'
		},
		{
			'decoded': 'a\u2AEBb',
			'encoded': 'a&Vbar;b'
		},
		{
			'decoded': 'a\u2AE9b',
			'encoded': 'a&vBarv;b'
		},
		{
			'decoded': 'a\u0412b',
			'encoded': 'a&Vcy;b'
		},
		{
			'decoded': 'a\u0432b',
			'encoded': 'a&vcy;b'
		},
		{
			'decoded': 'a\u22A2b',
			'encoded': 'a&vdash;b'
		},
		{
			'decoded': 'a\u22A8b',
			'encoded': 'a&vDash;b'
		},
		{
			'decoded': 'a\u22A9b',
			'encoded': 'a&Vdash;b'
		},
		{
			'decoded': 'a\u22ABb',
			'encoded': 'a&VDash;b'
		},
		{
			'decoded': 'a\u2AE6b',
			'encoded': 'a&Vdashl;b'
		},
		{
			'decoded': 'a\u22BBb',
			'encoded': 'a&veebar;b'
		},
		{
			'decoded': 'a\u22C1b',
			'encoded': 'a&Vee;b'
		},
		{
			'decoded': 'a\u225Ab',
			'encoded': 'a&veeeq;b'
		},
		{
			'decoded': 'a\u22EEb',
			'encoded': 'a&vellip;b'
		},
		{
			'decoded': 'a\u2016b',
			'encoded': 'a&Vert;b'
		},
		{
			'decoded': 'a\u2758b',
			'encoded': 'a&VerticalSeparator;b'
		},
		{
			'decoded': 'a\uD835\uDD19b',
			'encoded': 'a&Vfr;b'
		},
		{
			'decoded': 'a\uD835\uDD33b',
			'encoded': 'a&vfr;b'
		},
		{
			'decoded': 'a\u22B2b',
			'encoded': 'a&vltri;b'
		},
		{
			'decoded': 'a\u2282\u20D2b',
			'encoded': 'a&vnsub;b'
		},
		{
			'decoded': 'a\u2283\u20D2b',
			'encoded': 'a&vnsup;b'
		},
		{
			'decoded': 'a\uD835\uDD4Db',
			'encoded': 'a&Vopf;b'
		},
		{
			'decoded': 'a\uD835\uDD67b',
			'encoded': 'a&vopf;b'
		},
		{
			'decoded': 'a\u22B3b',
			'encoded': 'a&vrtri;b'
		},
		{
			'decoded': 'a\uD835\uDCB1b',
			'encoded': 'a&Vscr;b'
		},
		{
			'decoded': 'a\uD835\uDCCBb',
			'encoded': 'a&vscr;b'
		},
		{
			'decoded': 'a\u2ACB\uFE00b',
			'encoded': 'a&vsubnE;b'
		},
		{
			'decoded': 'a\u228A\uFE00b',
			'encoded': 'a&vsubne;b'
		},
		{
			'decoded': 'a\u2ACC\uFE00b',
			'encoded': 'a&vsupnE;b'
		},
		{
			'decoded': 'a\u228B\uFE00b',
			'encoded': 'a&vsupne;b'
		},
		{
			'decoded': 'a\u22AAb',
			'encoded': 'a&Vvdash;b'
		},
		{
			'decoded': 'a\u299Ab',
			'encoded': 'a&vzigzag;b'
		},
		{
			'decoded': 'a\u0174b',
			'encoded': 'a&Wcirc;b'
		},
		{
			'decoded': 'a\u0175b',
			'encoded': 'a&wcirc;b'
		},
		{
			'decoded': 'a\u2A5Fb',
			'encoded': 'a&wedbar;b'
		},
		{
			'decoded': 'a\u22C0b',
			'encoded': 'a&Wedge;b'
		},
		{
			'decoded': 'a\u2259b',
			'encoded': 'a&wedgeq;b'
		},
		{
			'decoded': 'a\uD835\uDD1Ab',
			'encoded': 'a&Wfr;b'
		},
		{
			'decoded': 'a\uD835\uDD34b',
			'encoded': 'a&wfr;b'
		},
		{
			'decoded': 'a\uD835\uDD4Eb',
			'encoded': 'a&Wopf;b'
		},
		{
			'decoded': 'a\uD835\uDD68b',
			'encoded': 'a&wopf;b'
		},
		{
			'decoded': 'a\u2118b',
			'encoded': 'a&wp;b'
		},
		{
			'decoded': 'a\u2240b',
			'encoded': 'a&wr;b'
		},
		{
			'decoded': 'a\uD835\uDCB2b',
			'encoded': 'a&Wscr;b'
		},
		{
			'decoded': 'a\uD835\uDCCCb',
			'encoded': 'a&wscr;b'
		},
		{
			'decoded': 'a\u22C2b',
			'encoded': 'a&xcap;b'
		},
		{
			'decoded': 'a\u25EFb',
			'encoded': 'a&xcirc;b'
		},
		{
			'decoded': 'a\u22C3b',
			'encoded': 'a&xcup;b'
		},
		{
			'decoded': 'a\u25BDb',
			'encoded': 'a&xdtri;b'
		},
		{
			'decoded': 'a\uD835\uDD1Bb',
			'encoded': 'a&Xfr;b'
		},
		{
			'decoded': 'a\uD835\uDD35b',
			'encoded': 'a&xfr;b'
		},
		{
			'decoded': 'a\u27F7b',
			'encoded': 'a&xharr;b'
		},
		{
			'decoded': 'a\u27FAb',
			'encoded': 'a&xhArr;b'
		},
		{
			'decoded': 'a\u039Eb',
			'encoded': 'a&Xi;b'
		},
		{
			'decoded': 'a\u03BEb',
			'encoded': 'a&xi;b'
		},
		{
			'decoded': 'a\u27F5b',
			'encoded': 'a&xlarr;b'
		},
		{
			'decoded': 'a\u27F8b',
			'encoded': 'a&xlArr;b'
		},
		{
			'decoded': 'a\u27FCb',
			'encoded': 'a&xmap;b'
		},
		{
			'decoded': 'a\u22FBb',
			'encoded': 'a&xnis;b'
		},
		{
			'decoded': 'a\u2A00b',
			'encoded': 'a&xodot;b'
		},
		{
			'decoded': 'a\uD835\uDD4Fb',
			'encoded': 'a&Xopf;b'
		},
		{
			'decoded': 'a\uD835\uDD69b',
			'encoded': 'a&xopf;b'
		},
		{
			'decoded': 'a\u2A01b',
			'encoded': 'a&xoplus;b'
		},
		{
			'decoded': 'a\u2A02b',
			'encoded': 'a&xotime;b'
		},
		{
			'decoded': 'a\u27F6b',
			'encoded': 'a&xrarr;b'
		},
		{
			'decoded': 'a\u27F9b',
			'encoded': 'a&xrArr;b'
		},
		{
			'decoded': 'a\uD835\uDCB3b',
			'encoded': 'a&Xscr;b'
		},
		{
			'decoded': 'a\uD835\uDCCDb',
			'encoded': 'a&xscr;b'
		},
		{
			'decoded': 'a\u2A06b',
			'encoded': 'a&xsqcup;b'
		},
		{
			'decoded': 'a\u2A04b',
			'encoded': 'a&xuplus;b'
		},
		{
			'decoded': 'a\u25B3b',
			'encoded': 'a&xutri;b'
		},
		{
			'decoded': 'a\xDDb',
			'encoded': 'a&Yacute;b'
		},
		{
			'decoded': 'a\xFDb',
			'encoded': 'a&yacute;b'
		},
		{
			'decoded': 'a\u042Fb',
			'encoded': 'a&YAcy;b'
		},
		{
			'decoded': 'a\u044Fb',
			'encoded': 'a&yacy;b'
		},
		{
			'decoded': 'a\u0176b',
			'encoded': 'a&Ycirc;b'
		},
		{
			'decoded': 'a\u0177b',
			'encoded': 'a&ycirc;b'
		},
		{
			'decoded': 'a\u042Bb',
			'encoded': 'a&Ycy;b'
		},
		{
			'decoded': 'a\u044Bb',
			'encoded': 'a&ycy;b'
		},
		{
			'decoded': 'a\xA5b',
			'encoded': 'a&yen;b'
		},
		{
			'decoded': 'a\uD835\uDD1Cb',
			'encoded': 'a&Yfr;b'
		},
		{
			'decoded': 'a\uD835\uDD36b',
			'encoded': 'a&yfr;b'
		},
		{
			'decoded': 'a\u0407b',
			'encoded': 'a&YIcy;b'
		},
		{
			'decoded': 'a\u0457b',
			'encoded': 'a&yicy;b'
		},
		{
			'decoded': 'a\uD835\uDD50b',
			'encoded': 'a&Yopf;b'
		},
		{
			'decoded': 'a\uD835\uDD6Ab',
			'encoded': 'a&yopf;b'
		},
		{
			'decoded': 'a\uD835\uDCB4b',
			'encoded': 'a&Yscr;b'
		},
		{
			'decoded': 'a\uD835\uDCCEb',
			'encoded': 'a&yscr;b'
		},
		{
			'decoded': 'a\u042Eb',
			'encoded': 'a&YUcy;b'
		},
		{
			'decoded': 'a\u044Eb',
			'encoded': 'a&yucy;b'
		},
		{
			'decoded': 'a\xFFb',
			'encoded': 'a&yuml;b'
		},
		{
			'decoded': 'a\u0178b',
			'encoded': 'a&Yuml;b'
		},
		{
			'decoded': 'a\u0179b',
			'encoded': 'a&Zacute;b'
		},
		{
			'decoded': 'a\u017Ab',
			'encoded': 'a&zacute;b'
		},
		{
			'decoded': 'a\u017Db',
			'encoded': 'a&Zcaron;b'
		},
		{
			'decoded': 'a\u017Eb',
			'encoded': 'a&zcaron;b'
		},
		{
			'decoded': 'a\u0417b',
			'encoded': 'a&Zcy;b'
		},
		{
			'decoded': 'a\u0437b',
			'encoded': 'a&zcy;b'
		},
		{
			'decoded': 'a\u017Bb',
			'encoded': 'a&Zdot;b'
		},
		{
			'decoded': 'a\u017Cb',
			'encoded': 'a&zdot;b'
		},
		{
			'decoded': 'a\u200Bb',
			'encoded': 'a&ZeroWidthSpace;b'
		},
		{
			'decoded': 'a\u0396b',
			'encoded': 'a&Zeta;b'
		},
		{
			'decoded': 'a\u03B6b',
			'encoded': 'a&zeta;b'
		},
		{
			'decoded': 'a\uD835\uDD37b',
			'encoded': 'a&zfr;b'
		},
		{
			'decoded': 'a\u2128b',
			'encoded': 'a&Zfr;b'
		},
		{
			'decoded': 'a\u0416b',
			'encoded': 'a&ZHcy;b'
		},
		{
			'decoded': 'a\u0436b',
			'encoded': 'a&zhcy;b'
		},
		{
			'decoded': 'a\u21DDb',
			'encoded': 'a&zigrarr;b'
		},
		{
			'decoded': 'a\uD835\uDD6Bb',
			'encoded': 'a&zopf;b'
		},
		{
			'decoded': 'a\u2124b',
			'encoded': 'a&Zopf;b'
		},
		{
			'decoded': 'a\uD835\uDCB5b',
			'encoded': 'a&Zscr;b'
		},
		{
			'decoded': 'a\uD835\uDCCFb',
			'encoded': 'a&zscr;b'
		},
		{
			'decoded': 'a\u200Db',
			'encoded': 'a&zwj;b'
		},
		{
			'decoded': 'a\u200Cb',
			'encoded': 'a&zwnj;b'
		},
		{
			'decoded': '&xxx; &xxx &thorn; &thorn &curren;t &current',
			'encoded': '&amp;xxx; &amp;xxx &amp;thorn; &amp;thorn &amp;curren;t &amp;current'
		}
	];

	// `throws` is a reserved word in ES3; alias it to avoid errors
	var raises = QUnit.assert['throws'];

	// explicitly call `QUnit.module()` instead of `module()`
	// in case we are in a CLI environment
	QUnit.module('he');

	test('decode', function() {
		false && forOwn(officialData, function(key, value) {
			var encoded = 'a ' + key + ' b';
			var decoded = 'a ' + value.characters + ' b';
			var description = 'codepoints ' + value.codepoints.join(',');
			// Decode all the official test data
			equal(
				he.decode(encoded),
				decoded,
				'Decoding ' + description
			);
			// Test if `decode(encode(decoded) == decoded`
			equal(
				he.decode(he.encode(decoded)),
				decoded,
				'decode(encode(decoded)) ' + description
			);
		});
		equal(
			he.decode('&amp;amp;amp;'),
			'&amp;amp;',
			'Only decode once'
		);
		equal(
			he.decode('&#x26;amp;'),
			'&amp;',
			'Only decode once'
		);
		equal(
			he.decode('a&foololthisdoesntexist;b'),
			'a&foololthisdoesntexist;b',
			'Ambiguous ampersand'
		);
		equal(
			he.decode('foo &lolwat; bar'),
			'foo &lolwat; bar',
			'Ambiguous ampersand'
		);
		raises(
			function() {
				he.decode('foo &lolwat; bar', {
					'strict': true
				});
			},
			Error,
			'Parse error: ambiguous ampersand in strict mode'
		);
		equal(
			he.decode('&notin; &noti &notin &copy123'),
			'\u2209 \xACi \xACin \xA9123',
			'Legacy named references (without a trailing semicolon)'
		);
		equal(
			he.decode('&amp;xxx; &amp;xxx &ampthorn; &ampthorn &ampcurren;t &ampcurrent'),
			'&xxx; &xxx &thorn; &thorn &curren;t &current',
			'Legacy named references'
		);
		equal(
			he.decode('a&#x1D306;b&#X0000000000001d306;c'),
			'a\uD834\uDF06b\uD834\uDF06c',
			'Hexadecimal escape'
		);
		equal(
			he.decode('a&#119558;b&#169;c&#00000000000000000169;d'),
			'a\uD834\uDF06b\xA9c\xA9d',
			'Decimal escape'
		);
		equal(
			he.decode('a&#xD834;&#xDF06;b&#55348;&#57094;c a&#x0;b&#0;c'),
			'a\uFFFD\uFFFDb\uFFFD\uFFFDc a\uFFFDb\uFFFDc',
			'Special numerical escapes (see issue #4)'
		);
		raises(
			function() {
				he.decode('a&#xD834;b', {
					'strict': true
				});
			},
			Error,
			'Parse error: special numerical escapes (see issue #4) in strict mode'
		);
		equal(
			he.decode('a&#x9999999999999999;b'),
			'a\uFFFDb',
			'Out-of-range hexadecimal escape in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('a&#x9999999999999999;b', {
					'strict': true
				});
			},
			Error,
			'Parse error: out-of-range hexadecimal escape in strict mode'
		);
		equal(
			he.decode('a&#x110000;b'),
			'a\uFFFDb',
			'Out-of-range hexadecimal escape in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('a&#x110000;b', {
					'strict': true
				});
			},
			Error,
			'Parse error: out-of-range hexadecimal escape in strict mode'
		);
		equal(
			he.decode('foo&ampbar'),
			'foo&bar',
			'Ambiguous ampersand in text context'
		);
		raises(
			function() {
				he.decode('foo&ampbar', {
					'strict': true
				});
			},
			Error,
			'Parse error: ambiguous ampersand in text context in strict mode'
		);
		equal(
			he.decode('foo&#x1D306qux'),
			'foo\uD834\uDF06qux',
			'Hexadecimal escape without trailing semicolon in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('foo&#x1D306qux', {
					'strict': true
				});
			},
			Error,
			'Hexadecimal escape without trailing semicolon in strict mode'
		);
		equal(
			he.decode('foo&#119558qux'),
			'foo\uD834\uDF06qux',
			'Decimal escape without trailing semicolon in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('foo&#119558qux', {
					'strict': true
				});
			},
			Error,
			'Decimal escape without trailing semicolon in strict mode'
		);
		equal(
			he.decode('foo&ampbar', {
				'isAttributeValue': true
			}),
			'foo&ampbar',
			'Attribute value context'
		);
		equal(
			he.decode('foo&amp;bar', {
				'isAttributeValue': true
			}),
			'foo&bar',
			'Attribute value context'
		);
		equal(
			he.decode('foo&amp;', {
				'isAttributeValue': true
			}),
			'foo&',
			'Attribute value context'
		);
		he.decode.options.isAttributeValue = true;
		equal(
			he.decode('foo&amp='),
			'foo&amp=',
			'Attribute value context'
		);
		raises(
			function() {
				he.decode('foo&amp=', {
					'strict': true
					// 'isAttributeValue': true is set globally
				});
			},
			Error,
			'Parse error: `foo&amp=` in attribute value context in strict mode'
		);
		he.decode.options.isAttributeValue = false;
		equal(
			he.decode('foo&amp', {
				'isAttributeValue': true
			}),
			'foo&',
			'Attribute value context'
		);
		equal(
			he.decode('foo&amplol', {
				'isAttributeValue': true,
				'strict': true
			}),
			'foo&amplol',
			'Attribute value context (not a parsing error!)'
			// E.g. `&amp` is only a parse error if it gets converted to `&` or if it
			// is followed by `=` in an attribute.
			// http://krijnhoetmer.nl/irc-logs/whatwg/20130701#l-249
		);
		raises(
			function() {
				he.decode('foo&amplol', {
					'isAttributeValue': false,
					'strict': true
				});
			},
			Error,
			'Parsing error: `foo&amplol` in text context'
		);
		he.decode.options.strict = true;
		raises(
			function() {
				he.decode('I\'m &notit; I tell you', {
					// 'strict': true is now set globally
					'isAttributeValue': false
				});
			},
			Error,
			'Parse error: `I\'m ¬it; I tell you`'
		);
		he.decode.options.strict = false;
		// https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
		equal(
			he.decode('I\'m &notit; I tell you', {
				'strict': true,
				'isAttributeValue': true
			}),
			'I\'m &notit; I tell you',
			'No parse error: `I\'m &notit; I tell you` as attribute value'
		);
		equal(
			he.decode('I\'m &notit; I tell you', {
				'strict': false,
				'isAttributeValue': true
			}),
			'I\'m &notit; I tell you',
			'No parse error: `I\'m &notit; I tell you` as attribute value in error-tolerant mode'
		);
		equal(
			he.decode('I\'m &notin; I tell you', {
				'strict': true
			}),
			'I\'m \u2209 I tell you',
			'No parse error: `I\'m &notin; I tell you` as attribute value'
		);
		equal(
			he.decode('&#x8D;'),
			'\x8D',
			'Decoding `&#x8D;` in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('&#x8D;', {
					'strict': true
				});
			},
			Error,
			'Parse error: `&#x8D;` in strict mode'
		);
		equal(
			he.decode('&#xD;'),
			'\x0D',
			'Decoding `&#xD;` in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('&#xD;', {
					'strict': true
				});
			},
			Error,
			'Parse error: `&#xD;` in strict mode'
		);
		equal(
			he.decode('&#x94;'),
			'\u201D',
			'Decoding `&#x94;` in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('&#x94;', {
					'strict': true
				});
			},
			Error,
			'Parse error: `&#x94;` in strict mode'
		);
		equal(
			he.decode('&#x1;'),
			'\x01',
			'Decoding `&#x1;` in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('&#x1;', {
					'strict': true
				});
			},
			Error,
			'Parse error: decoding `&#x1;` in strict mode'
		);
		equal(
			he.decode('&#x10FFFF;'),
			'\uDBFF\uDFFF',
			'Decoding `&#x10FFFF;` in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('&#x10FFFF;', {
					'strict': true
				});
			},
			Error,
			'Parse error: decoding `&#x10FFFF;` in strict mode'
		);
		equal(
			he.decode('&#196605;', {
				'strict': true
			}),
			'\uD87F\uDFFD',
			'Decoding `&#196605;` (valid code point) in strict mode'
		);
		raises(
			function() {
				he.decode('&#196607;', {
					'strict': true
				});
			},
			Error,
			'Parse error: decoding `&#196607;` in strict mode'
		);

		// “If no characters match the range, then don't consume any characters
		// (and unconsume the U+0023 NUMBER SIGN character and, if appropriate,
		// the X character). This is a parse error […].”
		equal(
			he.decode('&#xZ', {
				'strict': false
			}),
			'&#xZ',
			'Decoding `&#xZ` in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('&#xZ', {
					'strict': true
				});
			},
			Error,
			'Parse error: decoding `&#xZ` in strict mode'
		);
		equal(
			he.decode('&#Z', {
				'strict': false
			}),
			'&#Z',
			'Decoding `&#Z` in error-tolerant mode'
		);
		raises(
			function() {
				he.decode('&#Z', {
					'strict': true
				});
			},
			Error,
			'Parse error: decoding `&#Z` in strict mode'
		);
		equal(
			he.decode('&#00'),
			'\uFFFD',
			'Decoding `&#00` numeric character reference (see issue #43)'
		);
		equal(
			he.decode('&#0128;'),
			'\u20AC',
			'Decoding `0`-prefixed numeric character referencs (see issue #43)'
		);

	});
	test('encode', function() {
		equal(
			typeof he.encode.options,
			'object',
			'`he.encode.options` is exposed'
		);
		strictEqual(
			he.encode.options.useNamedReferences,
			false,
			'`he.encode.options.useNamedReferences` is exposed and `false` by default'
		);
		// Test encoding
		forEach(encodeData, function(item) {
			he.encode.options.useNamedReferences = true;
			equal(
				he.encode(item.decoded),
				item.encoded
			);
			he.encode.options.useNamedReferences = false;
		});
		equal(
			he.encode('foo\xA9bar\uD834\uDF06baz\u2603qux'),
			'foo&#xA9;bar&#x1D306;baz&#x2603;qux',
			'Other non-ASCII symbols are represented through hexadecimal escapes'
		);
		equal(
			he.encode('foo\xA9bar\uD834\uDF06baz\u2603qux', { 'useNamedReferences': true }),
			'foo&copy;bar&#x1D306;baz&#x2603;qux',
			'Other non-ASCII symbols are represented through hexadecimal escapes'
		);
		equal(
			he.encode('foo\xA9bar\uD834\uDF06baz\u2603qux', { 'useNamedReferences': true, 'decimal': true }),
			'foo&copy;bar&#119558;baz&#9731;qux',
			'Other non-ASCII symbols are represented through decimal escapes'
		);
		equal(
			he.encode('\'"<>&', { 'useNamedReferences': false }),
			'&#x27;&#x22;&#x3C;&#x3E;&#x26;',
			'Encode `escape`’s characters without using named references'
		);
		equal(
			he.encode('\'"<>&', { 'useNamedReferences': false, 'decimal': true }),
			'&#39;&#34;&#60;&#62;&#38;',
			'Encode `escape`’s characters without using named references'
		);
		equal(
			he.encode('a\tb', { 'encodeEverything': true }),
			'&#x61;&#x9;&#x62;',
			'Encode tab as `&#x9;` when `encodeEverything: true`'
		);
		equal(
			he.encode('a\tb', { 'encodeEverything': true, 'decimal': true }),
			'&#97;&#9;&#98;',
			'Encode tab as `&#9;` when `encodeEverything: true` and `decimal: true`'
		);
		equal(
			he.encode('a\tb', { 'encodeEverything': true, 'useNamedReferences': true }),
			'&#x61;&Tab;&#x62;',
			'Encode tab as `&Tab;` when `encodeEverything: true, useNamedReferences: true`'
		);
		equal(
			he.encode('a\uD834\uDF06b', { 'encodeEverything': true, 'useNamedReferences': false }),
			'&#x61;&#x1D306;&#x62;',
			'Encode U+1D306 as `&#x1D306;` when `encodeEverything: true, useNamedReferences: false`'
		);
		equal(
			he.encode('a\uD834\uDF06b', { 'encodeEverything': true, 'useNamedReferences': true }),
			'&#x61;&#x1D306;&#x62;',
			'Encode U+1D306 as `&#x1D306;` when `encodeEverything: true, useNamedReferences: true`'
		);
		equal(
			he.encode('a&b123;+\xA9>\u20D2<\u20D2\nfja', { 'encodeEverything': true, 'useNamedReferences': false }),
			'&#x61;&#x26;&#x62;&#x31;&#x32;&#x33;&#x3B;&#x2B;&#xA9;&#x3E;&#x20D2;&#x3C;&#x20D2;&#xA;&#x66;&#x6A;&#x61;',
			'All kinds of symbols when `encodeEverything: true, useNamedReferences: false`'
		);
		equal(
			he.encode('a&b123;+\xA9>\u20D2<\u20D2\nfja', { 'encodeEverything': true, 'useNamedReferences': true }),
			'&#x61;&amp;&#x62;&#x31;&#x32;&#x33;&semi;&plus;&copy;&nvgt;&nvlt;&NewLine;&fjlig;&#x61;',
			'All kinds of symbols when `encodeEverything: true, useNamedReferences: true`'
		);
		equal(
			he.encode('foo\uD800bar'),
			'foo&#xD800;bar',
			'Lone high surrogate'
		);
		raises(
			function() {
				he.encode('foo\uD800bar', { 'strict': true });
			},
			Error,
			'Lone high surrogate triggers parse error when `strict: true`'
		);
		equal(
			he.encode('\uD800bar'),
			'&#xD800;bar',
			'Lone high surrogate at the start of a string'
		);
		raises(
			function() {
				he.encode('\uD800bar', { 'strict': true });
			},
			Error,
			'Lone high surrogate at the start of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('foo\uD800'),
			'foo&#xD800;',
			'Lone high surrogate at the end of a string'
		);
		raises(
			function() {
				he.encode('foo\uD800', { 'strict': true });
			},
			Error,
			'Lone high surrogate at the end of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('foo\uDBFFbar'),
			'foo&#xDBFF;bar',
			'Lone high surrogate'
		);
		raises(
			function() {
				he.encode('foo\uDBFFbar', { 'strict': true });
			},
			Error,
			'Lone high surrogate triggers parse error when `strict: true`'
		);
		equal(
			he.encode('\uDBFFbar'),
			'&#xDBFF;bar',
			'Lone high surrogate at the start of a string'
		);
		raises(
			function() {
				he.encode('\uDBFFbar', { 'strict': true });
			},
			Error,
			'Lone high surrogate at the start of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('foo\uDBFF'),
			'foo&#xDBFF;',
			'Lone high surrogate at the end of a string'
		);
		raises(
			function() {
				he.encode('foo\uDBFF', { 'strict': true });
			},
			Error,
			'Lone high surrogate at the end of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('foo\uDC00bar'),
			'foo&#xDC00;bar',
			'Lone low surrogate'
		);
		raises(
			function() {
				he.encode('foo\uDC00bar', { 'strict': true });
			},
			Error,
			'Lone low surrogate triggers parse error when `strict: true`'
		);
		equal(
			he.encode('\uDC00bar'),
			'&#xDC00;bar',
			'Lone low surrogate at the start of a string'
		);
		raises(
			function() {
				he.encode('\uDC00bar', { 'strict': true });
			},
			Error,
			'Lone low surrogate at the start of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('foo\uDC00'),
			'foo&#xDC00;',
			'Lone low surrogate at the end of a string'
		);
		raises(
			function() {
				he.encode('foo\uDC00', { 'strict': true });
			},
			Error,
			'Lone low surrogate at the end of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('foo\uDFFFbar'),
			'foo&#xDFFF;bar',
			'Lone low surrogate'
		);
		raises(
			function() {
				he.encode('foo\uDFFFbar', { 'strict': true });
			},
			Error,
			'Lone low surrogate triggers parse error when `strict: true`'
		);
		equal(
			he.encode('\uDFFFbar'),
			'&#xDFFF;bar',
			'Lone low surrogate at the start of a string'
		);
		raises(
			function() {
				he.encode('\uDFFFbar', { 'strict': true });
			},
			Error,
			'Lone low surrogate at the start of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('foo\uDFFF'),
			'foo&#xDFFF;',
			'Lone low surrogate at the end of a string'
		);
		raises(
			function() {
				he.encode('foo\uDFFF', { 'strict': true });
			},
			Error,
			'Lone low surrogate at the end of a string triggers parse error when `strict: true`'
		);
		equal(
			he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF'),
			'\0&#x1;&#x2;&#x3;&#x4;&#x5;&#x6;&#x7;&#x8;&#xB;&#xE;&#xF;&#x10;&#x11;&#x12;&#x13;&#x14;&#x15;&#x16;&#x17;&#x18;&#x19;&#x1A;&#x1B;&#x1C;&#x1D;&#x1E;&#x1F;&#x7F;\x80&#x81;\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C&#x8D;\x8E&#x8F;&#x90;\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C&#x9D;\x9E\x9F&#xFDD0;&#xFDD1;&#xFDD2;&#xFDD3;&#xFDD4;&#xFDD5;&#xFDD6;&#xFDD7;&#xFDD8;&#xFDD9;&#xFDDA;&#xFDDB;&#xFDDC;&#xFDDD;&#xFDDE;&#xFDDF;&#xFDE0;&#xFDE1;&#xFDE2;&#xFDE3;&#xFDE4;&#xFDE5;&#xFDE6;&#xFDE7;&#xFDE8;&#xFDE9;&#xFDEA;&#xFDEB;&#xFDEC;&#xFDED;&#xFDEE;&#xFDEF;&#xFFFE;&#xFFFF;&#x1FFFE;&#x1FFFF;&#x2FFFE;&#x2FFFF;&#x3FFFE;&#x3FFFF;&#x4FFFE;&#x4FFFF;&#x5FFFE;&#x5FFFF;&#x6FFFE;&#x6FFFF;&#x7FFFE;&#x7FFFF;&#x8FFFE;&#x8FFFF;&#x9FFFE;&#x9FFFF;&#xAFFFE;&#xAFFFF;&#xBFFFE;&#xBFFFF;&#xCFFFE;&#xCFFFF;&#xDFFFE;&#xDFFFF;&#xEFFFE;&#xEFFFF;&#xFFFFE;&#xFFFFF;&#x10FFFE;&#x10FFFF;',
			'Encodes disallowed code points in input, except those whose character references would refer to another code point'
		);
		equal(
			he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF', { 'encodeEverything': true }),
			'\0&#x1;&#x2;&#x3;&#x4;&#x5;&#x6;&#x7;&#x8;&#xB;&#xE;&#xF;&#x10;&#x11;&#x12;&#x13;&#x14;&#x15;&#x16;&#x17;&#x18;&#x19;&#x1A;&#x1B;&#x1C;&#x1D;&#x1E;&#x1F;&#x7F;\x80&#x81;\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C&#x8D;\x8E&#x8F;&#x90;\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C&#x9D;\x9E\x9F&#xFDD0;&#xFDD1;&#xFDD2;&#xFDD3;&#xFDD4;&#xFDD5;&#xFDD6;&#xFDD7;&#xFDD8;&#xFDD9;&#xFDDA;&#xFDDB;&#xFDDC;&#xFDDD;&#xFDDE;&#xFDDF;&#xFDE0;&#xFDE1;&#xFDE2;&#xFDE3;&#xFDE4;&#xFDE5;&#xFDE6;&#xFDE7;&#xFDE8;&#xFDE9;&#xFDEA;&#xFDEB;&#xFDEC;&#xFDED;&#xFDEE;&#xFDEF;&#xFFFE;&#xFFFF;&#x1FFFE;&#x1FFFF;&#x2FFFE;&#x2FFFF;&#x3FFFE;&#x3FFFF;&#x4FFFE;&#x4FFFF;&#x5FFFE;&#x5FFFF;&#x6FFFE;&#x6FFFF;&#x7FFFE;&#x7FFFF;&#x8FFFE;&#x8FFFF;&#x9FFFE;&#x9FFFF;&#xAFFFE;&#xAFFFF;&#xBFFFE;&#xBFFFF;&#xCFFFE;&#xCFFFF;&#xDFFFE;&#xDFFFF;&#xEFFFE;&#xEFFFF;&#xFFFFE;&#xFFFFF;&#x10FFFE;&#x10FFFF;',
			'Encodes disallowed code points in input, except those whose character references would refer to another code point, even when `encodeEverything: true`'
		);
		raises(
			function() {
				he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF', { 'strict': true });
			},
			Error,
			'Parse error: forbidden code point when `strict: true`'
		);
		equal(
			he.encode('\0\x89'),
			'\0\x89',
			'Does not encode invalid code points whose character references would refer to another code point'
		);
		equal(
			he.encode('\0\x89', { 'encodeEverything': true }),
			'\0\x89',
			'Does not encode invalid code points whose character references would refer to another code point, even when `encodeEverything: true` is used'
		);
		equal(
			he.encode('foo\xA9<bar\uD834\uDF06>baz\u2603"qux', { 'allowUnsafeSymbols': true }),
			'foo&#xA9;<bar&#x1D306;>baz&#x2603;"qux',
			'Markup characters pass through when `allowUnsafeSymbols: true`'
		);
		equal(
			he.encode('a<b', { 'allowUnsafeSymbols': true, 'encodeEverything': true }),
			'&#x61;&#x3C;&#x62;',
			'`encodeEverything` takes precedence over `allowUnsafeSymbols`'
		);
		equal(
			he.encode('a<\u223E>', { 'allowUnsafeSymbols': true, 'useNamedReferences': true }),
			'a<&ac;>',
			'`useNamedReferences` only affects non-ASCII symbols when `allowUnsafeSymbols: true`'
		);
		raises(
			function() {
				he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF', { 'allowUnsafeSymbols': true, 'strict': true });
			},
			Error,
			'Parse error: forbidden code point when `allowUnsafeSymbols: true` and `strict: true`'
		);
		equal(
			he.encode('\xE4\xF6\xFC\xC4\xD6\xDC', { 'decimal': true }),
			'&#228;&#246;&#252;&#196;&#214;&#220;',
			'encode to decimal numeric character references'
		);
		equal(
			he.encode('\xE4\xF6\xFC\xC4\xD6\xDC', { 'decimal': true, 'useNamedReferences': true }),
			'&auml;&ouml;&uuml;&Auml;&Ouml;&Uuml;',
			'encode to named HTML entities whereby `useNamedReferences` takes precedence over `decimal`'
		);
		equal(
			he.encode('a<b', { 'decimal': true, 'encodeEverything': true }),
			'&#97;&#60;&#98;',
			'`encodeEverything` to decimal numeric character references'
		);
		equal(
			he.encode('\0\x89', { 'decimal': true }),
			'\0\x89',
			'Does not encode invalid code points whose character references would refer to another code point, even if `decimal: true` is used'
		);
		equal(
			he.encode('\0\x89', { 'decimal': true, 'encodeEverything': true }),
			'\0\x89',
			'Does not encode invalid code points whose character references would refer to another code point, even if `encodeEverything: true` and `decimal: true` is used'
		);
		equal(
			he.encode('foo\xA9<bar\uD834\uDF06>baz\u2603"qux', { 'decimal': true, 'allowUnsafeSymbols': true }),
			'foo&#169;<bar&#119558;>baz&#9731;"qux',
			'Unsafe symbols pass through when `allowUnsafeSymbols: true`; non-ASCII symbols are encoded to decimal HTML entities'
		);
		equal(
			he.encode('a<b', { 'decimal': true, 'encodeEverything': true, 'allowUnsafeSymbols': true }),
			'&#97;&#60;&#98;',
			'`encodeEverything` to decimal numeric character references whereby `encodeEverything` takes precedence over `allowUnsafeSymbols`'
		);
		equal(
			he.encode('a<\xE4>', { 'decimal': true, 'allowUnsafeSymbols': true, 'useNamedReferences': true }),
			'a<&auml;>',
			'encode to named character references whereby `useNamedReferences` takes precedence over `decimal`; unsafe symbols allowed'
		);
		equal(
			he.encode('a<\u223E>', { 'decimal': true, 'allowUnsafeSymbols': true }),
			'a<&#8766;>',
			'`decimal` only affects non-ASCII symbols when `allowUnsafeSymbols: true`'
		);
		raises(
			he.encode('a<\xE4>', { 'decimal': true, 'allowUnsafeSymbols': false }),
			'a<&auml;>',
			'Parse error: unsafe symbols are not allowed'
		);
		raises(
			function() {
				he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF', { 'decimal': true, 'strict': true });
			},
			Error,
			'Parse error: forbidden code point when `decimal: true`, `strict: true`'
		);
		raises(
			function() {
				he.encode('\0\x01\x02\x03\x04\x05\x06\x07\b\x0B\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F\x7F\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C\x8D\x8E\x8F\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C\x9D\x9E\x9F\uFDD0\uFDD1\uFDD2\uFDD3\uFDD4\uFDD5\uFDD6\uFDD7\uFDD8\uFDD9\uFDDA\uFDDB\uFDDC\uFDDD\uFDDE\uFDDF\uFDE0\uFDE1\uFDE2\uFDE3\uFDE4\uFDE5\uFDE6\uFDE7\uFDE8\uFDE9\uFDEA\uFDEB\uFDEC\uFDED\uFDEE\uFDEF\uFFFE\uFFFF\uD83F\uDFFE\uD83F\uDFFF\uD87F\uDFFE\uD87F\uDFFF\uD8BF\uDFFE\uD8BF\uDFFF\uD8FF\uDFFE\uD8FF\uDFFF\uD93F\uDFFE\uD93F\uDFFF\uD97F\uDFFE\uD97F\uDFFF\uD9BF\uDFFE\uD9BF\uDFFF\uD9FF\uDFFE\uD9FF\uDFFF\uDA3F\uDFFE\uDA3F\uDFFF\uDA7F\uDFFE\uDA7F\uDFFF\uDABF\uDFFE\uDABF\uDFFF\uDAFF\uDFFE\uDAFF\uDFFF\uDB3F\uDFFE\uDB3F\uDFFF\uDB7F\uDFFE\uDB7F\uDFFF\uDBBF\uDFFE\uDBBF\uDFFF\uDBFF\uDFFE\uDBFF\uDFFF', { 'decimal': true, 'allowUnsafeSymbols': true, 'strict': true });
			},
			Error,
			'Parse error: forbidden code point when `decimal: true`, `allowUnsafeSymbols: true` and `strict: true`'
		);
	});
	test('escape', function() {
		equal(
			he.escape('<img src=\'x\' onerror="prompt(1)"><script>alert(1)</script><img src="x` `<script>alert(1)</script>"` `>'),
			'&lt;img src=&#x27;x&#x27; onerror=&quot;prompt(1)&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;img src=&quot;x&#x60; &#x60;&lt;script&gt;alert(1)&lt;/script&gt;&quot;&#x60; &#x60;&gt;',
			'XML/HTML-escape'
		);
		equal(
			he.unescape('&lt;img src=&#x27;x&#x27; onerror=&quot;prompt(1)&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;img src=&quot;x&#x60; &#x60;&lt;script&gt;alert(1)&lt;/script&gt;&quot;&#x60; &#x60;&gt;'),
			'<img src=\'x\' onerror="prompt(1)"><script>alert(1)</script><img src="x` `<script>alert(1)</script>"` `>',
			'XML/HTML-unescape'
		);
		strictEqual(
			he.decode,
			he.unescape,
			'`decode` and `unescape` should be the same'
		);
	});

	/*--------------------------------------------------------------------------*/

	// configure QUnit and call `QUnit.start()` for
	// Narwhal, Node.js, PhantomJS, Rhino, and RingoJS
	if (!root.document || root.phantom) {
		QUnit.config.noglobals = true;
		QUnit.start();
	}
}(typeof global == 'object' && global || this));
