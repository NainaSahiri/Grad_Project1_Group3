
function dis(val) {
    document.getElementById("result").value += val
}

function myMathFunction(event) {
    if (event.key == '0' || event.key == '1'
        || event.key == '2' || event.key == '3'
        || event.key == '4' || event.key == '5'
        || event.key == '6' || event.key == '7'
        || event.key == '8' || event.key == '9'
        || event.key == '+' || event.key == '-'
        || event.key == '*' || event.key == '/')
        document.getElementById("result").value += event.key;
}

function myTrigFunction(event) {
    if (event.key == 'sin' || event.key == 'cos'
        || event.key == 'cosec' || event.key == 'sec'
        || event.key == 'tan' || event.key == 'cot'
        || event.key == 'sinh' || event.key == 'cosh'
        || event.key == 'sech' || event.key == 'cosech')
        document.getElementById("result").value += event.key;
}

const mathRegex = new RegExp('[+*^\/-]')
const trigRegex = new RegExp('^sin|^cos|^tan|^sec|^cosec|^cot')
function solve() {
    let x = document.getElementById("result").value
    if (mathRegex.test(x)) {
        solveMath();
    } else if (trigRegex.test(x)) {
        solveTrigonometric();
    } else {
        solveFunction();
    }
}

function solveMath() {
    let x = document.getElementById("result").value
    let y = math.evaluate(x)
    document.getElementById("result").value = y.toFixed(5)
}

function solveTrigonometric() {
    let trig = document.getElementById("result").value
    let degree = trig.match(/(\d+)/)[0]
    if (trig.startsWith("sin")) {
        value = math.sin(degree * Math.PI / 180)
    } else if (trig.startsWith("cos")) {
        value = math.cos(degree * Math.PI / 180)
    } else if (trig.startsWith("tan")) {
        value = math.tan(degree * Math.PI / 180)
    } else if (trig.startsWith("cosec")) {
        value = (1 / math.sin(degree * Math.PI / 180))
    } else if (trig.startsWith("sec")) {
        value = (1 / math.cos(degree * Math.PI / 180))
    } else if (trig.startsWith("cot")) {
        value = (1 / math.tan(degree * Math.PI / 180))
    } else if (trig.startsWith("sinh")) {
        value = math.sinh(degree * Math.PI / 180)
    } else if (trig.startsWith("cosh")) {
        value = math.cosh(degree * Math.PI / 180)
    } else if (trig.startsWith("cosech")) {
        value = (1 / math.sinh(degree * Math.PI / 180))
    } else if (trig.startsWith("sech")) {
        value = (1 / math.cosh(degree * Math.PI / 180))
    }
    document.getElementById("result").value = value.toFixed(5)
}

function clr() {
    document.getElementById("result").value = ""
}

function backspace() {
    let result = document.getElementById("result").value;
    document.getElementById("result").value = result.substring(0, result.length - 1);
}

function solveFunction() {
    let fun = document.getElementById("result").value
    console.log("inside function")
    let result = ""
    let degree = fun.match(/(\d+)/)[0]
    if (fun.startsWith("log")) {
        result = Math.log10(degree);
    } else if (fun.startsWith("ln")) {
        result = Math.log(degree)
    } else if (fun.startsWith("cbrt")) {
        result = Math.cbrt(degree)
    } else if (fun.startsWith("sqrt")) {
        result = Math.sqrt(degree)
    } else if (fun.includes("pi")) {
        result = degree * Math.PI
    }
    document.getElementById("result").value = result.toFixed(5)
}

function speechRecognitionFunction() {
    console.log("into the function")
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    // JSpeech Grammar Format
    var grammar = '#JSGF V1.0;'

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        var last = event.results.length - 1;
        var result = document.getElementById("result");
        var command = event.results[last][0].transcript.toLowerCase();
        console.log(command)
        var degree;
        Math.eval = function (command) {
            if (command.startsWith("sine ") || command.startsWith("cosecant inverse ")) {
                if (command.startsWith("sine ")) {
                    degree = command.substring(5, command.length);
                } else {
                    degree = command.substring(16, command.length);
                }
                console.log(degree)
                result.value = Math.sin(degree * Math.PI / 180).toFixed(5);
            } else if (command.startsWith("cosine") || command.startsWith("secant inverse ")) {
                if (command.startsWith("cosine ")) {
                    degree = command.substring(7, command.length);
                } else {
                    degree = command.substring(15, command.length);
                }
                result.value = Math.cos(degree * Math.PI / 180).toFixed(5);
            } else if (command.startsWith("tangent ") || command.startsWith("cotangent inverse ")) {
                if (command.startsWith("tangent ")) {
                    degree = command.substring(7, command.length);
                } else {
                    degree = command.substring(18, command.length);
                }
                result.value = Math.tan(degree * Math.PI / 180).toFixed(5);
            } else if (command.startsWith("secant ") || command.startsWith("cosine inverse ")) {
                if (command.startsWith("secant ")) {
                    degree = command.substring(7, command.length);
                } else {
                    degree = command.substring(14, command.length);
                }
                console.log(degree)
                result.value = (1 / Math.sin(degree * Math.PI / 180)).toFixed(5);
            } else if (command.startsWith("cosecant ") || command.startsWith("sine inverse ")) {
                if (command.startsWith("cosecant ")) {
                    degree = command.substring(9, command.length);
                } else {
                    degree = command.substring(12, command.length);
                }
                result.value = (1 / Math.cos(degree * Math.PI / 180)).toFixed(5);
            } else if (command.startsWith("cotangent ") || command.startsWith("tangent inverse ")) {
                if (command.startsWith("cotangent ")) {
                    degree = command.substring(10, command.length);
                } else {
                    degree = command.substring(16, command.length);
                }
                result.value = (1 / Math.tan(degree * Math.PI / 180)).toFixed(5);
            } else if (command.startsWith("natural log ")) {
                // using natural logarithm (ln)
                //natural log 3 with base 4 or natural log 3
                if (!command.includes('inverse')) {
                    if (command.includes('base')) {
                        const array = command.split(" ");
                        result.value = (Math.log(array[2]) / Math.log(array[5])).toFixed(5);
                    } else {
                        const array = command.split(" ");
                        result.value = Math.log(array[2]).toFixed(5);
                    }
                } else {
                    //natural log inverse 3 with base 4 or natural log inverse 3
                    if (command.includes('base')) {
                        const array = command.split(" ");
                        result.value = (Math.log(array[6]) / Math.log(array[3])).toFixed(5);
                    } else {
                        const array1 = command.split(" ");
                        result.value = (1 / (Math.log(array1[3]))).toFixed(5);
                    }
                }
            } else if (command.startsWith("log ")) {
                // using logarithm with base 10 (log10)
                //log 3 with base 4 or log 3
                if (!command.includes('inverse')) {
                    if (command.includes('base')) {
                        const array = command.split(" ");
                        result.value = (Math.log10(array[1]) / Math.log10(array[4])).toFixed(5);
                    } else {
                        const array = command.split(" ");
                        result.value = Math.log10(array[1]).toFixed(5);
                    }
                } else {
                    //log inverse 3 with base 4 or log inverse 3
                    if (command.includes('base')) {
                        const array = command.split(" ");
                        result.value = (Math.log10(array[5]) / Math.log10(array[2])).toFixed(5);
                    } else {
                        const array1 = command.split(" ");
                        result.value = (1 / (Math.log10(array1[2]))).toFixed(5);
                    }
                }
            } else if (command.startsWith("exponential ") && command.includes(" ^ ")) {
                // exponential to the power 3
                const val = command.split(" ");
                result.value = Math.exp(val[2]).toFixed(5);
            } else if (command.includes(" ^ ")) {
                const val = command.split(" ");
                result.value = Math.pow(val[0], val[2]).toFixed(5);
            } else if (command.includes("pi")) {
                // pi function - 7 pi
                const val = command.split(" ");
                result.value = val[0] * Math.PI.toFixed(5);
            } else if (command.endsWith("factorial")) {
                const val = command.split(" ");
                const val1 = val[0];
                var final;
                if (val1 == '0' && val1 == '1') {
                    final = 1;
                } else if (val1 > 0) {
                    let fact = 1;
                    for (i = 1; i <= val1; i++) {
                        fact *= i;
                    }
                    final = fact;
                }
                result.value = final;
            } else if (command.includes("root")) {
                console.log('inside root')
                if (command.startsWith("square root of ")) {
                    const val = command.split(" ");
                    result.value = Math.sqrt(val[val.length - 1]).toFixed(5);
                } else if (command.startsWith("cube root of ")) {
                    const val = command.split(" ");
                    result.value = Math.cbrt(val[val.length - 1]).toFixed(5);
                } else {
                    // fourth root of 3
                    console.log('inside this')
                    const val = command.split(" ");
                    var root;
                    console.log(val[0])
                    switch (val[0]) {
                        case 'fourth':
                        case '4th':
                            root = 4;
                            break;
                        case 'fifth':
                        case '5th':
                            root = 5;
                            break;
                        case 'sixth':
                        case '6th':
                            root = 6;
                            break;
                        case 'seventh':
                        case '7th':
                            root = 7;
                            break;
                        case 'eigth':
                        case '8th':
                            root = 8;
                            break;
                        case 'ninth':
                        case '9th':
                            root = 9;
                            break;
                        case 'tenth':
                        case '10th':
                            root = 10;
                            break;
                    }
                    console.log(root)
                    result.value = Math.pow(val[val.length - 1], (1 / root)).toFixed(5);
                }
            } else {
                for (var i = 0; i < command.length; i++) {
                    //3 percent 4
                    if (isNaN(command[i]) && !['+', '-', '/', '*', '%'].includes(command[i])) {
                        result.value = "";
                        result.value = command;
                        return NaN;
                    } else {
                        result.value = eval(command);
                    }
                }
            }
        }
        Math.eval(command);
        console.log("Hiiiii")
        setTimeout(function () {
            var toSpeak = new SpeechSynthesisUtterance(result.value);
            synth.speak(toSpeak);
        }, 1000);
    };

    recognition.onspeechend = function () {
        recognition.stop();
    };

    recognition.onerror = function (event) {
        message.textContent = 'Error occurred in recognition: ' + event.error;
    }

    recognition.start();



    // text to speech (Speech Synthesis)
    var txtInput = document.querySelector('#txtInput');
    var btnSpeak = document.querySelector('#btnSpeak');
    var synth = window.speechSynthesis;
}