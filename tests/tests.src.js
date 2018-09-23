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

	var officialData = <%= testDataMap %>;
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
			he.encode(<%= stringInvalidCodePoints %>),
			'\0&#x1;&#x2;&#x3;&#x4;&#x5;&#x6;&#x7;&#x8;&#xB;&#xE;&#xF;&#x10;&#x11;&#x12;&#x13;&#x14;&#x15;&#x16;&#x17;&#x18;&#x19;&#x1A;&#x1B;&#x1C;&#x1D;&#x1E;&#x1F;&#x7F;\x80&#x81;\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C&#x8D;\x8E&#x8F;&#x90;\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C&#x9D;\x9E\x9F&#xFDD0;&#xFDD1;&#xFDD2;&#xFDD3;&#xFDD4;&#xFDD5;&#xFDD6;&#xFDD7;&#xFDD8;&#xFDD9;&#xFDDA;&#xFDDB;&#xFDDC;&#xFDDD;&#xFDDE;&#xFDDF;&#xFDE0;&#xFDE1;&#xFDE2;&#xFDE3;&#xFDE4;&#xFDE5;&#xFDE6;&#xFDE7;&#xFDE8;&#xFDE9;&#xFDEA;&#xFDEB;&#xFDEC;&#xFDED;&#xFDEE;&#xFDEF;&#xFFFE;&#xFFFF;&#x1FFFE;&#x1FFFF;&#x2FFFE;&#x2FFFF;&#x3FFFE;&#x3FFFF;&#x4FFFE;&#x4FFFF;&#x5FFFE;&#x5FFFF;&#x6FFFE;&#x6FFFF;&#x7FFFE;&#x7FFFF;&#x8FFFE;&#x8FFFF;&#x9FFFE;&#x9FFFF;&#xAFFFE;&#xAFFFF;&#xBFFFE;&#xBFFFF;&#xCFFFE;&#xCFFFF;&#xDFFFE;&#xDFFFF;&#xEFFFE;&#xEFFFF;&#xFFFFE;&#xFFFFF;&#x10FFFE;&#x10FFFF;',
			'Encodes disallowed code points in input, except those whose character references would refer to another code point'
		);
		equal(
			he.encode(<%= stringInvalidCodePoints %>, { 'encodeEverything': true }),
			'\0&#x1;&#x2;&#x3;&#x4;&#x5;&#x6;&#x7;&#x8;&#xB;&#xE;&#xF;&#x10;&#x11;&#x12;&#x13;&#x14;&#x15;&#x16;&#x17;&#x18;&#x19;&#x1A;&#x1B;&#x1C;&#x1D;&#x1E;&#x1F;&#x7F;\x80&#x81;\x82\x83\x84\x85\x86\x87\x88\x89\x8A\x8B\x8C&#x8D;\x8E&#x8F;&#x90;\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9A\x9B\x9C&#x9D;\x9E\x9F&#xFDD0;&#xFDD1;&#xFDD2;&#xFDD3;&#xFDD4;&#xFDD5;&#xFDD6;&#xFDD7;&#xFDD8;&#xFDD9;&#xFDDA;&#xFDDB;&#xFDDC;&#xFDDD;&#xFDDE;&#xFDDF;&#xFDE0;&#xFDE1;&#xFDE2;&#xFDE3;&#xFDE4;&#xFDE5;&#xFDE6;&#xFDE7;&#xFDE8;&#xFDE9;&#xFDEA;&#xFDEB;&#xFDEC;&#xFDED;&#xFDEE;&#xFDEF;&#xFFFE;&#xFFFF;&#x1FFFE;&#x1FFFF;&#x2FFFE;&#x2FFFF;&#x3FFFE;&#x3FFFF;&#x4FFFE;&#x4FFFF;&#x5FFFE;&#x5FFFF;&#x6FFFE;&#x6FFFF;&#x7FFFE;&#x7FFFF;&#x8FFFE;&#x8FFFF;&#x9FFFE;&#x9FFFF;&#xAFFFE;&#xAFFFF;&#xBFFFE;&#xBFFFF;&#xCFFFE;&#xCFFFF;&#xDFFFE;&#xDFFFF;&#xEFFFE;&#xEFFFF;&#xFFFFE;&#xFFFFF;&#x10FFFE;&#x10FFFF;',
			'Encodes disallowed code points in input, except those whose character references would refer to another code point, even when `encodeEverything: true`'
		);
		raises(
			function() {
				he.encode(<%= stringInvalidCodePoints %>, { 'strict': true });
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
				he.encode(<%= stringInvalidCodePoints %>, { 'allowUnsafeSymbols': true, 'strict': true });
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
				he.encode(<%= stringInvalidCodePoints %>, { 'decimal': true, 'strict': true });
			},
			Error,
			'Parse error: forbidden code point when `decimal: true`, `strict: true`'
		);
		raises(
			function() {
				he.encode(<%= stringInvalidCodePoints %>, { 'decimal': true, 'allowUnsafeSymbols': true, 'strict': true });
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
