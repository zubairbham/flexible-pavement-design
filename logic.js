// General Input
const generalNextbtn = document.getElementById('general-next-btn');
generalNextbtn.addEventListener('click', showMaterialBox);
function showMaterialBox(e) {
    const pavtType = document.getElementById('pavt-type').value;
    const roadType = document.getElementById('road-type').value;
    const roadClass = document.getElementById('road-class').value;
    const designLife = document.getElementById("design-life").value;
    const materialPropBox = document.getElementById('material-prop-box');
    const generalNextBtn = document.getElementById('general-next-btn');
    if (pavtType == "" || roadType == "" || roadClass == "" || designLife == "") {
        alert("Some fields are empty.");
    } else {
        materialPropBox.style = "display: block;";
        generalNextBtn.style = "display: none;";
    }
}

// Material Properties Input
const materialNextBtn = document.getElementById('material-next-btn');
materialNextBtn.addEventListener('click', showTrafficBox);
function showTrafficBox(e) {
    const sgCbrValue = document.getElementById("cbr-value-sg").value;
    const sbCbrValue = document.getElementById('cbr-value-sb').value;
    const bsCbrValue = document.getElementById('cbr-value-bs').value;
    const abModulus = document.getElementById('modulus-ab').value;
    const awModulus = document.getElementById('modulus-aw').value;
    const trafficBox = document.getElementById('traffic-box');
    const materialNextBtn = document.getElementById('material-next-btn');
    const calcBtnBox = document.getElementById('calc-btn-box');
    if (sgCbrValue == "" || sbCbrValue == "" || bsCbrValue == "" || abModulus == "" || awModulus == "") {
        alert("Some fields are empty.");
    } else {
        trafficBox.style = "display: block;";
        calcBtnBox.style = "display: block;";
        materialNextBtn.style = "display: none;";
    }
}



// STEP 05 - TRAFFIC
const myAddBtn = document.getElementById('add-btn');
myAddBtn.addEventListener('click', trafficCalc);
let commuEsal = 0;
function trafficCalc(e) {
    const inputValue1 = document.getElementById('veh-type').value;
    const inputValue2 = document.getElementById('aadt').value;
    const inputValue3 = document.getElementById('growth-rate').value;
    const designLife = document.getElementById("design-life").value;
    const carriagewayType = document.getElementById("carriageway-type").value;
    const numberOfLanes = document.getElementById("number-of-lanes").value;
    let dd;
    if (carriagewayType == "single") {
        dd = 1;
    } else {
        dd = 0.55;
    }

    let dl;
    if (numberOfLanes == 1) {
        dl = 1;
    } else if (numberOfLanes == 2) {
        dl = 0.9;
    } else if (numberOfLanes == 3) {
        dl = 0.6;
    } else {
        dl = 0.4;
    }

    let esalValue;
    let tf;
    let gf;
    let totalEsal = document.getElementById('comm-esal');

    if (inputValue1 == "1.2") {
        tf = 4.134;
        gf = (((1 + (inputValue3 / 100)) ** designLife) - 1) / (inputValue3 / 100);
        esalValue = Math.round(tf * gf * dd * dl * inputValue2 * 365);
    } else if (inputValue1 == "1.2-2") {
        tf = 13.931;
        gf = (((1 + (inputValue3 / 100)) ** designLife) - 1) / (inputValue3 / 100);
        esalValue = Math.round(tf * gf * dd * dl * inputValue2 * 365);
    } else if (inputValue1 == "1.22") {
        tf = 10.325;
        gf = (((1 + (inputValue3 / 100)) ** designLife) - 1) / (inputValue3 / 100);
        esalValue = Math.round(tf * gf * dd * dl * inputValue2 * 365);
    } else if (inputValue1 == "1.2-22") {
        tf = 10.512;
        gf = (((1 + (inputValue3 / 100)) ** designLife) - 1) / (inputValue3 / 100);
        esalValue = Math.round(tf * gf * dd * dl * inputValue2 * 365);
    } else if (inputValue1 == "1.22-22") {
        tf = 8.192;
        gf = (((1 + (inputValue3 / 100)) ** designLife) - 1) / (inputValue3 / 100);
        esalValue = Math.round(tf * gf * dd * dl * inputValue2 * 365);
    } else if (inputValue1 == "1.22+222") {
        tf = 10.789;
        gf = (((1 + (inputValue3 / 100)) ** designLife) - 1) / (inputValue3 / 100);
        esalValue = Math.round(tf * gf * dd * dl * inputValue2 * 365);
    }

    if (inputValue1 != "" && inputValue2 != "" && inputValue3 != "") {
        let zub = document.createElement('tr');
        zub.innerHTML = `<td>` + inputValue1 + `</td>
        <td>`+ inputValue2 + `</td>
        <td>`+ inputValue3 + `</td>
        <td  id="esal">`+ esalValue + `</td>`;
        tableBody.append(zub);
    } else {
        esalValue = 0;
        alert("Some fields are empty.")
    }
    commuEsal = commuEsal + esalValue
    totalEsal.innerHTML = commuEsal;
}


//  CALCULATE THICKNESSES
const claculateBtn = document.getElementById('calculate-btn');
claculateBtn.addEventListener('click', calculate);
function calculate(e) {
    const pavtType = document.getElementById('pavt-type').value;
    const roadType = document.getElementById('road-type').value;
    const roadClass = document.getElementById('road-class').value;
    const designLife = document.getElementById("design-life").value;
    const sgCbrValue = document.getElementById("cbr-value-sg").value;
    const sbCbrValue = document.getElementById('cbr-value-sb').value;
    const bsCbrValue = document.getElementById('cbr-value-bs').value;
    const abModulus = document.getElementById('modulus-ab').value;
    const awModulus = document.getElementById('modulus-aw').value;
    const resultBox = document.getElementById('result-box');
    // STEP 01 START - PAVEMENT PERFORMANCE
    let pi;
    let pt;
    let psi;
    if (pavtType == "flexible") {
        pi = 4.2;
    }
    if (roadClass == "freeway" || roadClass == "arterial") {
        pt = 2.5;
    } else if (roadClass == "collector") {
        pt = 2.25;
    } else if (roadClass == "street") {
        pt = 2;
    }
    psi = (pi - pt).toFixed(2);

    // STEP 01 END - PAVEMENT PERFORMANCE

    // STEP 02 START - ROADBED SOIL
    let resModulus = (2555 * (sgCbrValue ** 0.64)).toFixed(2);

    // STEP 02 END - ROAD BED SOIL

    // STEP 03 - RELIABILITY
    let reliability;
    let zr;
    if (roadType == "urban" && roadClass == "freeway") {
        reliability = 95;
    } else if (roadType == "urban" && roadClass == "arterial") {
        reliability = 90;
    } else if (roadType == "urban" && roadClass == "collector") {
        reliability = 90;
    } else if (roadType == "urban" && roadClass == "street") {
        reliability = 70;
    } else if (roadType == "rural" && roadClass == "freeway") {
        reliability = 90;
    } else if (roadType == "rural" && roadClass == "arterial") {
        reliability = 85;
    } else if (roadType == "rural" && roadClass == "collector") {
        reliability = 85;
    } else if (roadType == "rural" && roadClass == "street") {
        reliability = 70;
    }

    if (reliability == 95) {
        zr = -1.645;
    } else if (reliability == 90) {
        zr = -1.282;
    } else if (reliability == 85) {
        zr = -1.037;
    } else if (reliability == 70) {
        zr = -0.524;
    }

    // STEP 03 - RELIABILITY

    // STEP 04 - STANDARD DEVIATION
    let sd = 0.45;

    // STEP 04 - STANDARD DEVIATION

    // STEP 05 START - TRAFFIC

    // STEP 05 END - TRAFFIC

    // STEP 06 START - MATERIAL PROPERTIES
    let sbLayerCoef;
    if (sbCbrValue == 20) {
        sbLayerCoef = 0.095;
    } else if (sbCbrValue == 25) {
        sbLayerCoef = 0.1;
    } else if (sbCbrValue == 30) {
        sbLayerCoef = 0.11;
    } else if (sbCbrValue == 35) {
        sbLayerCoef = 0.115;
    } else if (sbCbrValue == 40) {
        sbLayerCoef = 0.12;
    } else if (sbCbrValue == 45) {
        sbLayerCoef = 0.125;
    } else if (sbCbrValue == 50) {
        sbLayerCoef = 0.127;
    }

    let bsLayerCoef;
    if (bsCbrValue == 50) {
        bsLayerCoef = 0.118;
    } else if (bsCbrValue == 55) {
        bsLayerCoef = 0.122;
    } else if (bsCbrValue == 60) {
        bsLayerCoef = 0.125;
    } else if (bsCbrValue == 65) {
        bsLayerCoef = 0.129;
    } else if (bsCbrValue == 70) {
        bsLayerCoef = 0.132;
    } else if (bsCbrValue == 75) {
        bsLayerCoef = 0.134;
    } else if (bsCbrValue == 80) {
        bsLayerCoef = 0.136;
    } else if (bsCbrValue == 85) {
        bsLayerCoef = 0.137;
    } else if (bsCbrValue == 90) {
        bsLayerCoef = 0.139;
    }

    let abLayerCoef = ((0.1776 * Math.log(abModulus)) - 1.9662).toFixed(3);

    let awLayerCoef = ((0.0000005 * awModulus) + 0.215).toFixed(3);

    let drainageCoef = 0.9;

    let sbModulus = Math.round((5585.3 * Math.log(sbCbrValue)) - 4257.5);
    let bsModulus = Math.round((9001 * Math.log(bsCbrValue)) - 11129);


    // STEP 06 END - MATERIAL PROPERTIES


    // FINAL STEP START - THICKNESS DESIGN
    // SN4
    const displayImpSg = document.getElementById('box5');
    if (sgCbrValue <= 10) {
        let lhs4;
        lhs4 = (Math.log10(commuEsal)).toFixed(3);
        let rhs4 = 0;
        let sn4 = 0;
        for (let i = 0; rhs4 < lhs4; i++) {
            sn4 = sn4 + 0.001;

            rhs4 = (zr * sd) + ((9.36 * Math.log10(sn4 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn4 + 1) ** 5.19)))) + (2.32 * Math.log10(resModulus)) - (8.07));
        }
        sn4 = sn4.toFixed(3);
        // SN3
        let lhs3;
        lhs3 = (Math.log10(commuEsal)).toFixed(3);
        let rhs3 = 0;
        let sn3 = 0;

        for (let i = 0; rhs3 < lhs3; i++) {
            sn3 = sn3 + 0.001;

            rhs3 = (zr * sd) + ((9.36 * Math.log10(sn3 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn3 + 1) ** 5.19)))) + (2.32 * Math.log10(2555 * (10 ** 0.64))) - (8.07));
            // here in above equation, cbr of improved subgrade is takes as 10. Since. Mr=2555*(cbr^0.64), hence, Mr=2555*(10^0.64)
        }
        sn3 = sn3.toFixed(3);

        // SN2
        let lhs2;
        lhs2 = (Math.log10(commuEsal)).toFixed(3);
        let rhs2 = 0;
        let sn2 = 0;

        for (let i = 0; rhs2 < lhs2; i++) {
            sn2 = sn2 + 0.001;

            rhs2 = (zr * sd) + ((9.36 * Math.log10(sn2 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn2 + 1) ** 5.19)))) + (2.32 * Math.log10(sbModulus)) - (8.07));
        }
        sn2 = sn2.toFixed(3);

        // SN1
        let lhs1;
        lhs1 = (Math.log10(commuEsal)).toFixed(3);
        let rhs1 = 0;
        let sn1 = 0;

        for (let i = 0; rhs1 < lhs1; i++) {
            sn1 = sn1 + 0.001;

            rhs1 = (zr * sd) + ((9.36 * Math.log10(sn1 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn1 + 1) ** 5.19)))) + (2.32 * Math.log10(bsModulus)) - (8.07));
        }
        sn1 = sn1.toFixed(3);


        // Final Thicknesses
        // Surface Course
        let surfTh = Math.ceil((sn1 / abLayerCoef) * 2) / 2;
        let awcTh = 2;
        let abcTh = surfTh - awcTh;

        sn1 = abLayerCoef * surfTh;

        // Base Course
        let aggbsTh = Math.ceil(((sn2 - sn1) / (bsLayerCoef * drainageCoef)) * 2) / 2;

        sn2 = sn1 + (bsLayerCoef * drainageCoef * aggbsTh);

        // Subbase Course
        let sbTh = Math.ceil(((sn3 - sn2) / (sbLayerCoef * drainageCoef)) * 2) / 2;
        sn3 = sn2 + (sbLayerCoef * drainageCoef * sbTh);
        // Improved Subgrade Thickness
        let impSgTh = Math.ceil(((sn4 - sn3) / (0.08 * drainageCoef)) * 2) / 2;

        awcTh = Math.ceil(awcTh * 25);
        abcTh = Math.ceil(abcTh * 25);
        aggbsTh = Math.ceil(aggbsTh * 25);
        sbTh = Math.ceil(sbTh * 25);
        impSgTh = Math.ceil(impSgTh * 25);


        const displayAwcTh = document.getElementById('box1');
        displayAwcTh.textContent = 'Asphalt Wearing Course (E = ' + awModulus + ' psi) - ' + awcTh + ' mm';
        const displayAbcTh = document.getElementById('box2');
        displayAbcTh.textContent = 'Asphalt Base Course (E = ' + abModulus + ' psi) - ' + abcTh + ' mm';
        const displayAggbsTh = document.getElementById('box3');
        displayAggbsTh.textContent = 'Aggregate Base Course (CBR ' + bsCbrValue + ') - ' + aggbsTh + ' mm';
        const displaySbTh = document.getElementById('box4');
        displaySbTh.textContent = 'Granular Subbase Course (CBR ' + sbCbrValue + ') - ' + sbTh + ' mm';
        const displayImpSgTh = document.getElementById('box5');
        displayImpSgTh.textContent = 'Improved Subgrade (CBR 10) - ' + impSgTh + ' mm';
        const displaySgTh = document.getElementById('box6');
        displaySgTh.textContent = 'Natural Subgrade (CBR ' + sgCbrValue + ')';

        displayImpSg.style = "display: block;"
    }else{
        // SN3
        let lhs3;
        lhs3 = (Math.log10(commuEsal)).toFixed(3);
        let rhs3 = 0;
        let sn3 = 0;

        for (let i = 0; rhs3 < lhs3; i++) {
            sn3 = sn3 + 0.001;

            rhs3 = (zr * sd) + ((9.36 * Math.log10(sn3 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn3 + 1) ** 5.19)))) + (2.32 * Math.log10(resModulus)) - (8.07));
        }
        sn3 = sn3.toFixed(3);

        // SN2
        let lhs2;
        lhs2 = (Math.log10(commuEsal)).toFixed(3);
        let rhs2 = 0;
        let sn2 = 0;

        for (let i = 0; rhs2 < lhs2; i++) {
            sn2 = sn2 + 0.001;

            rhs2 = (zr * sd) + ((9.36 * Math.log10(sn2 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn2 + 1) ** 5.19)))) + (2.32 * Math.log10(sbModulus)) - (8.07));
        }
        sn2 = sn2.toFixed(3);

        // SN1
        let lhs1;
        lhs1 = (Math.log10(commuEsal)).toFixed(3);
        let rhs1 = 0;
        let sn1 = 0;

        for (let i = 0; rhs1 < lhs1; i++) {
            sn1 = sn1 + 0.001;

            rhs1 = (zr * sd) + ((9.36 * Math.log10(sn1 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn1 + 1) ** 5.19)))) + (2.32 * Math.log10(bsModulus)) - (8.07));
        }
        sn1 = sn1.toFixed(3);



        // Final Thicknesses
        // Surface Course
        let surfTh = Math.ceil((sn1 / abLayerCoef) * 2) / 2;
        let awcTh = 2;
        let abcTh = surfTh - awcTh;

        sn1 = abLayerCoef * surfTh;

        // Base Course
        let aggbsTh = Math.ceil(((sn2 - sn1) / (bsLayerCoef * drainageCoef)) * 2) / 2;

        sn2 = sn1 + (bsLayerCoef * drainageCoef * aggbsTh);

        // Subbase Course
        let sbTh = Math.ceil(((sn3 - sn2) / (sbLayerCoef * drainageCoef)) * 2) / 2;
        sn3 = sn2 + (sbLayerCoef * drainageCoef * sbTh);
        

        awcTh = Math.ceil(awcTh * 25);
        abcTh = Math.ceil(abcTh * 25);
        aggbsTh = Math.ceil(aggbsTh * 25);
        sbTh = Math.ceil(sbTh * 25);


        const displayAwcTh = document.getElementById('box1');
        displayAwcTh.textContent = 'Asphalt Wearing Course (E = ' + awModulus + ' psi) - ' + awcTh + ' mm';
        const displayAbcTh = document.getElementById('box2');
        displayAbcTh.textContent = 'Asphalt Base Course (E = ' + abModulus + ' psi) - ' + abcTh + ' mm';
        const displayAggbsTh = document.getElementById('box3');
        displayAggbsTh.textContent = 'Aggregate Base Course (CBR ' + bsCbrValue + ') - ' + aggbsTh + ' mm';
        const displaySbTh = document.getElementById('box4');
        displaySbTh.textContent = 'Granular Subbase Course (CBR ' + sbCbrValue + ') - ' + sbTh + ' mm';
        const displaySgTh = document.getElementById('box6');
        displaySgTh.textContent = 'Natural Subgrade (CBR ' + sgCbrValue + ')';
    }




    // Thickness Adjustments


    // FINAL STEP END - THICKNESS DESIGN

    // Show result
    resultBox.style = "visibility: visible;"
}


// CLOSE RESULT BOX
const resultBox = document.getElementById('close-display');
resultBox.addEventListener('click', closeResultBox);
function closeResultBox(e) {
    const resultBox = document.getElementById('result-box');
    resultBox.style = "visibility: hidden;"
    location.reload();
}