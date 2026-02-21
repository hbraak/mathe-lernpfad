// ============================================================
// LERNPFAD-DATEN: Produkt- und Kettenregel
// ============================================================

const UNITS = {
    // --------------------------------------------------------
    // DIAGNOSE
    // --------------------------------------------------------
    diagnose: {
        title: "Einstiegsdiagnose",
        description: "Teste dein Vorwissen zu Ableitungen. Das Ergebnis bestimmt deinen Lernpfad.",
        tasks: [
            {
                id: "d1",
                question: "Leite ab: $f(x) = 3x^4$",
                answer: "12x^3",
                accepts: ["12x^3", "12x³", "12*x^3"],
                hints: ["Potenzregel: $f(x)=ax^n \\Rightarrow f'(x)=n \\cdot a \\cdot x^{n-1}$"],
                errorPatterns: {
                    "3x^3": "Du hast den Vorfaktor vergessen! Bei $3x^4$ musst du $4 \\cdot 3 = 12$ rechnen.",
                    "12x^4": "Der Exponent muss um 1 kleiner werden: $n-1 = 3$."
                }
            },
            {
                id: "d2",
                question: "Leite ab: $f(x) = 5x^2 + 3x - 7$",
                answer: "10x+3",
                accepts: ["10x+3", "10x + 3", "10*x+3", "3+10x"],
                hints: ["Summenregel: Jede Summand einzeln ableiten. Konstanten fallen weg."],
                errorPatterns: {
                    "10x+3-7": "Konstanten ($-7$) fallen beim Ableiten weg!",
                    "10x": "Die Ableitung von $3x$ ist $3$ — nicht vergessen!"
                }
            },
            {
                id: "d3",
                question: "Leite ab: $f(x) = \\sqrt{x}$\n\n(Tipp: Schreibe als Potenz um)",
                answer: "1/(2*sqrt(x))",
                accepts: ["1/(2*sqrt(x))", "1/(2√x)", "0.5*x^(-0.5)", "0,5*x^(-0,5)", "1/2*x^(-1/2)", "0.5x^(-0.5)"],
                hints: [
                    "$\\sqrt{x} = x^{1/2}$ — jetzt Potenzregel anwenden!",
                    "$f(x)=x^{1/2} \\Rightarrow f'(x)=\\frac{1}{2} \\cdot x^{-1/2}$"
                ],
                errorPatterns: {
                    "1/2*x": "Fast! Aber der Exponent muss $\\frac{1}{2}-1 = -\\frac{1}{2}$ sein.",
                }
            },
            {
                id: "d4",
                question: "Leite ab: $f(x) = e^x$",
                answer: "e^x",
                accepts: ["e^x", "exp(x)", "e^(x)"],
                hints: ["$e^x$ ist die einzige Funktion, die sich selbst als Ableitung hat."],
                errorPatterns: {
                    "x*e^(x-1)": "Vorsicht! Die Potenzregel gilt hier nicht. $e^x$ ist eine Exponentialfunktion, keine Potenz.",
                    "0": "$e^x$ ist keine Konstante!"
                }
            },
            {
                id: "d5",
                question: "Leite ab: $f(x) = \\frac{1}{x^2}$\n\n(Schreibe als $x^{-2}$ um)",
                answer: "-2/x^3",
                accepts: ["-2/x^3", "-2x^(-3)", "-2*x^(-3)", "-2/x³"],
                hints: [
                    "$\\frac{1}{x^2} = x^{-2}$ — jetzt Potenzregel!",
                    "$f'(x) = -2 \\cdot x^{-3} = \\frac{-2}{x^3}$"
                ],
                errorPatterns: {
                    "2/x^3": "Vorzeichen! $-2 \\cdot x^{-2-1} = -2x^{-3}$",
                }
            },
            {
                id: "d6",
                question: "Welche Ableitungsregel brauchst du für $f(x) = x^2 \\cdot \\sin(x)$?",
                type: "choice",
                options: ["Potenzregel", "Summenregel", "Produktregel", "Kettenregel"],
                correct: 2,
                hints: ["Zwei Funktionen werden multipliziert: $u(x) \\cdot v(x)$"]
            },
            {
                id: "d7",
                question: "Welche Ableitungsregel brauchst du für $f(x) = (3x+1)^5$?",
                type: "choice",
                options: ["Potenzregel", "Summenregel", "Produktregel", "Kettenregel"],
                correct: 3,
                hints: ["Eine Funktion ist in eine andere \"eingesetzt\": äußere$($ innere$(x))$"]
            },
            {
                id: "d8",
                question: "Welche Ableitungsregel brauchst du für $f(x) = e^{2x}$?",
                type: "choice",
                options: ["Potenzregel", "Keine — $e^x$ bleibt $e^x$", "Produktregel", "Kettenregel"],
                correct: 3,
                hints: ["$e^{2x}$ ist nicht dasselbe wie $e^x$! Es steckt eine innere Funktion $2x$ drin."]
            }
        ]
    },

    // --------------------------------------------------------
    // EINHEIT 0: Wiederholung (für Score < 60%)
    // --------------------------------------------------------
    unit0: {
        title: "Wiederholung: Grundableitungen",
        description: "Frische dein Wissen zu Potenzregel und Grundfunktionen auf.",
        explanation: `
            <h3>Potenzregel</h3>
            <p>Für $f(x) = a \\cdot x^n$ gilt:</p>
            <p style="text-align:center; font-size:1.3rem; margin: 1rem 0;">$f'(x) = n \\cdot a \\cdot x^{n-1}$</p>
            <p><strong>Merke:</strong> Exponent nach vorne, Exponent um 1 verringern.</p>
            <h3 style="margin-top:1.5rem;">Wichtige Spezialfälle</h3>
            <ul style="margin-left:1.5rem; line-height:2;">
                <li>$f(x) = c$ (Konstante) → $f'(x) = 0$</li>
                <li>$f(x) = x$ → $f'(x) = 1$</li>
                <li>$f(x) = e^x$ → $f'(x) = e^x$</li>
                <li>$f(x) = \\ln(x)$ → $f'(x) = \\frac{1}{x}$</li>
            </ul>
            <h3 style="margin-top:1.5rem;">Summenregel</h3>
            <p>$(f + g)'(x) = f'(x) + g'(x)$ — jeden Summanden einzeln ableiten.</p>
        `,
        tasks: [
            {
                id: "u0_1", question: "Leite ab: $f(x) = 7x^3$",
                answer: "21x^2", accepts: ["21x^2", "21x²", "21*x^2"],
                hints: ["$7 \\cdot 3 = 21$, Exponent: $3-1=2$"],
                errorPatterns: { "7x^2": "Vorfaktor: $3 \\cdot 7 = 21$!" }
            },
            {
                id: "u0_2", question: "Leite ab: $f(x) = -2x^5 + x$",
                answer: "-10x^4+1", accepts: ["-10x^4+1", "-10x^4 + 1", "1-10x^4"],
                hints: ["Summenregel + Potenzregel für jeden Term."],
                errorPatterns: { "-10x^4": "$x$ ableiten gibt $1$!" }
            },
            {
                id: "u0_3", question: "Leite ab: $f(x) = x^{-1}$\n\n(= $\\frac{1}{x}$)",
                answer: "-x^(-2)", accepts: ["-x^(-2)", "-1/x^2", "-1/x²", "-x^-2"],
                hints: ["Potenzregel: $-1 \\cdot x^{-1-1} = -x^{-2}$"],
                errorPatterns: {}
            },
            {
                id: "u0_4", question: "Leite ab: $f(x) = 3e^x + 2x^2 - 5$",
                answer: "3e^x+4x", accepts: ["3e^x+4x", "3e^x + 4x", "4x+3e^x", "3*e^x+4*x"],
                hints: ["$e^x$ bleibt $e^x$, Konstante $-5$ fällt weg."],
                errorPatterns: { "3e^x+4x-5": "Konstanten fallen beim Ableiten weg!" }
            },
            {
                id: "u0_5", question: "Leite ab: $f(x) = \\frac{2}{x^3}$\n\n(= $2x^{-3}$)",
                answer: "-6x^(-4)", accepts: ["-6x^(-4)", "-6/x^4", "-6x^-4", "-6/x⁴"],
                hints: ["$2 \\cdot (-3) = -6$, Exponent: $-3-1=-4$"],
                errorPatterns: { "6x^(-4)": "Vorzeichen beachten! $(-3) \\cdot 2 = -6$" }
            }
        ],
        masteryThreshold: 0.8
    },

    // --------------------------------------------------------
    // EINHEIT 1: Produktregel
    // --------------------------------------------------------
    unit1: {
        title: "Einheit 1: Produktregel",
        description: "Lerne, wie du Produkte zweier Funktionen ableitest.",
        explanation: `
            <h3>Produktregel</h3>
            <p>Wenn $f(x) = u(x) \\cdot v(x)$, dann gilt:</p>
            <p style="text-align:center; font-size:1.3rem; margin: 1rem 0; padding: 1rem; background: #3b82f620; border-radius: 8px;">
                $f'(x) = u'(x) \\cdot v(x) + u(x) \\cdot v'(x)$
            </p>
            <p><strong>Merkregel:</strong> „Erste ableiten mal Zweite plus Erste mal Zweite ableiten"</p>
            <h3 style="margin-top:1.5rem;">Vorgehen (3 Schritte)</h3>
            <ol style="margin-left:1.5rem; line-height:2;">
                <li><strong>Identifiziere</strong> $u(x)$ und $v(x)$</li>
                <li><strong>Bilde</strong> $u'(x)$ und $v'(x)$ einzeln</li>
                <li><strong>Einsetzen</strong> in die Formel: $u' \\cdot v + u \\cdot v'$</li>
            </ol>
        `,
        example: {
            title: "Beispiel: $f(x) = x^2 \\cdot e^x$",
            content: `
                <p><strong>Schritt 1:</strong> $u(x) = x^2$, $v(x) = e^x$</p>
                <p><strong>Schritt 2:</strong> $u'(x) = 2x$, $v'(x) = e^x$</p>
                <p><strong>Schritt 3:</strong></p>
                <p style="text-align:center;">$f'(x) = 2x \\cdot e^x + x^2 \\cdot e^x = e^x(2x + x^2)$</p>
            `
        },
        tasks: [
            {
                id: "u1_1",
                question: "Leite ab mit der Produktregel:\n\n$f(x) = x \\cdot e^x$\n\n(Tipp: $u=x$, $v=e^x$)",
                answer: "e^x+x*e^x",
                accepts: ["e^x+x*e^x", "e^x+xe^x", "e^x(1+x)", "e^x*(1+x)", "(1+x)*e^x", "(1+x)e^x", "xe^x+e^x", "x*e^x+e^x"],
                hints: [
                    "$u'(x)=1$, $v'(x)=e^x$",
                    "$f'(x) = 1 \\cdot e^x + x \\cdot e^x$"
                ],
                errorPatterns: {
                    "e^x": "Du hast nur einen Teil der Produktregel! Es fehlt $+ u \\cdot v'$.",
                    "x*e^x": "Das ist $u \\cdot v'$, aber es fehlt $u' \\cdot v = 1 \\cdot e^x$."
                }
            },
            {
                id: "u1_2",
                question: "Leite ab: $f(x) = x^3 \\cdot \\ln(x)$",
                answer: "3x^2*ln(x)+x^2",
                accepts: ["3x^2*ln(x)+x^2", "3x^2ln(x)+x^2", "x^2(3ln(x)+1)", "x^2*(3ln(x)+1)", "x^2+3x^2*ln(x)", "x^2+3x^2ln(x)"],
                hints: [
                    "$u=x^3$, $v=\\ln(x)$ → $u'=3x^2$, $v'=\\frac{1}{x}$",
                    "$f'(x) = 3x^2 \\cdot \\ln(x) + x^3 \\cdot \\frac{1}{x}$"
                ],
                errorPatterns: {
                    "3x^2*ln(x)": "Es fehlt der zweite Teil: $u \\cdot v' = x^3 \\cdot \\frac{1}{x} = x^2$"
                }
            },
            {
                id: "u1_3",
                question: "Welche Teilfunktionen wählst du bei $f(x) = (2x+1) \\cdot x^4$?",
                type: "choice",
                options: [
                    "$u = 2x$, $v = x^4$",
                    "$u = 2x+1$, $v = x^4$",
                    "$u = 2x+1$, $v = 4x^3$",
                    "$u = x$, $v = x^4$"
                ],
                correct: 1,
                hints: ["Die beiden Faktoren des Produkts sind $u$ und $v$."]
            },
            {
                id: "u1_4",
                question: "Leite ab: $f(x) = (2x+1) \\cdot x^4$",
                answer: "10x^4+4x^3",
                accepts: [
                    "2x^4+4x^3*(2x+1)", "2x^4+(8x^4+4x^3)", "10x^4+4x^3",
                    "2x^4+8x^4+4x^3"
                ],
                hints: [
                    "$u=2x+1$, $v=x^4$ → $u'=2$, $v'=4x^3$",
                    "$f'(x) = 2 \\cdot x^4 + (2x+1) \\cdot 4x^3$",
                    "Ausmultiplizieren: $2x^4 + 8x^4 + 4x^3 = 10x^4 + 4x^3$"
                ],
                errorPatterns: {}
            },
            {
                id: "u1_5",
                question: "Leite ab: $f(x) = e^x \\cdot \\sin(x)$",
                answer: "e^x*sin(x)+e^x*cos(x)",
                accepts: [
                    "e^x*sin(x)+e^x*cos(x)", "e^x(sin(x)+cos(x))", "e^x*(sin(x)+cos(x))",
                    "e^xsin(x)+e^xcos(x)", "(sin(x)+cos(x))*e^x"
                ],
                hints: [
                    "$u=e^x$, $v=\\sin(x)$ → $u'=e^x$, $v'=\\cos(x)$",
                    "$f'(x) = e^x \\cdot \\sin(x) + e^x \\cdot \\cos(x)$"
                ],
                errorPatterns: {
                    "e^x*cos(x)": "Das ist nur $u \\cdot v'$! Es fehlt $u' \\cdot v = e^x \\cdot \\sin(x)$."
                }
            }
        ],
        masteryThreshold: 0.8
    },

    // --------------------------------------------------------
    // EINHEIT 2: Kettenregel
    // --------------------------------------------------------
    unit2: {
        title: "Einheit 2: Kettenregel",
        description: "Lerne, wie du zusammengesetzte Funktionen ableitest.",
        explanation: `
            <h3>Kettenregel</h3>
            <p>Wenn $f(x) = g(h(x))$ — also eine <strong>äußere Funktion</strong> $g$ und eine <strong>innere Funktion</strong> $h$:</p>
            <p style="text-align:center; font-size:1.3rem; margin: 1rem 0; padding: 1rem; background: #10b98120; border-radius: 8px;">
                $f'(x) = g'(h(x)) \\cdot h'(x)$
            </p>
            <p><strong>Merkregel:</strong> „Äußere Ableitung mal innere Ableitung"</p>
            <h3 style="margin-top:1.5rem;">Vorgehen (3 Schritte)</h3>
            <ol style="margin-left:1.5rem; line-height:2;">
                <li><strong>Erkenne</strong> äußere Funktion $g$ und innere Funktion $h(x)$</li>
                <li><strong>Leite die äußere Funktion ab</strong> (innere stehen lassen!)</li>
                <li><strong>Multipliziere mit der Ableitung der inneren Funktion</strong></li>
            </ol>
        `,
        example: {
            title: "Beispiel: $f(x) = (3x+2)^4$",
            content: `
                <p><strong>Schritt 1:</strong> Äußere: $g(u) = u^4$, Innere: $h(x) = 3x+2$</p>
                <p><strong>Schritt 2:</strong> Äußere ableiten: $g'(u) = 4u^3$ → einsetzen: $4(3x+2)^3$</p>
                <p><strong>Schritt 3:</strong> Mal innere Ableitung: $h'(x) = 3$</p>
                <p style="text-align:center;">$f'(x) = 4(3x+2)^3 \\cdot 3 = 12(3x+2)^3$</p>
            `
        },
        tasks: [
            {
                id: "u2_1",
                question: "Leite ab: $f(x) = (2x+5)^3$",
                answer: "6(2x+5)^2",
                accepts: ["6(2x+5)^2", "6*(2x+5)^2", "3*(2x+5)^2*2"],
                hints: [
                    "Äußere: $u^3$, Innere: $2x+5$",
                    "Äußere Abl.: $3(2x+5)^2$, Innere Abl.: $2$"
                ],
                errorPatterns: {
                    "3(2x+5)^2": "Innere Ableitung vergessen! Du musst noch mit $h'(x) = 2$ multiplizieren.",
                    "(2x+5)^2": "Sowohl Vorfaktor ($3$) als auch innere Ableitung ($2$) fehlen."
                }
            },
            {
                id: "u2_2",
                question: "Leite ab: $f(x) = e^{3x}$",
                answer: "3e^(3x)",
                accepts: ["3e^(3x)", "3*e^(3x)", "3e^{3x}"],
                hints: [
                    "Äußere: $e^u$, Innere: $3x$",
                    "Äußere Abl.: $e^{3x}$, Innere Abl.: $3$"
                ],
                errorPatterns: {
                    "e^(3x)": "Innere Ableitung vergessen! $h(x) = 3x$ → $h'(x) = 3$"
                }
            },
            {
                id: "u2_3",
                question: "Was ist die innere Funktion bei $f(x) = \\sqrt{x^2+1}$ ?",
                type: "choice",
                options: ["$\\sqrt{x}$", "$x^2+1$", "$x^2$", "$x+1$"],
                correct: 1,
                hints: ["Was steht 'drin' unter der Wurzel?"]
            },
            {
                id: "u2_4",
                question: "Leite ab: $f(x) = (x^2+1)^5$",
                answer: "10x(x^2+1)^4",
                accepts: ["10x(x^2+1)^4", "10x*(x^2+1)^4", "5*(x^2+1)^4*2x"],
                hints: [
                    "Äußere: $u^5$, Innere: $x^2+1$",
                    "Äußere Abl.: $5(x^2+1)^4$, Innere Abl.: $2x$",
                    "$f'(x) = 5(x^2+1)^4 \\cdot 2x = 10x(x^2+1)^4$"
                ],
                errorPatterns: {
                    "5(x^2+1)^4": "Innere Ableitung $h'(x) = 2x$ vergessen!"
                }
            },
            {
                id: "u2_5",
                question: "Leite ab: $f(x) = e^{-x^2}$",
                answer: "-2x*e^(-x^2)",
                accepts: ["-2x*e^(-x^2)", "-2xe^(-x^2)", "-2x*e^{-x^2}", "e^(-x^2)*(-2x)"],
                hints: [
                    "Äußere: $e^u$, Innere: $-x^2$",
                    "Äußere Abl.: $e^{-x^2}$, Innere Abl.: $-2x$"
                ],
                errorPatterns: {
                    "e^(-x^2)": "Innere Ableitung vergessen! $(-x^2)' = -2x$",
                    "2x*e^(-x^2)": "Vorzeichen! Die innere Ableitung von $-x^2$ ist $-2x$."
                }
            }
        ],
        masteryThreshold: 0.8
    },

    // --------------------------------------------------------
    // EINHEIT 2.5: Welche Regel? (Interleaving)
    // --------------------------------------------------------
    unit25: {
        title: "Welche Regel brauchst du?",
        description: "Trainiere, die richtige Ableitungsregel zu erkennen.",
        explanation: `
            <h3>Struktur erkennen</h3>
            <p>Bevor du ableitest, frag dich immer:</p>
            <ul style="margin-left:1.5rem; line-height:2.2;">
                <li><strong>Produkt?</strong> Zwei Faktoren multipliziert → <span style="color:#3b82f6">Produktregel</span></li>
                <li><strong>Verkettung?</strong> Funktion in Funktion → <span style="color:#10b981">Kettenregel</span></li>
                <li><strong>Beides?</strong> Erst Produktregel, dann Kettenregel für die Teile</li>
                <li><strong>Weder noch?</strong> Einfache Potenz-/Summenregel</li>
            </ul>
        `,
        tasks: [
            {
                id: "mix1", type: "choice",
                question: "Welche Regel für $f(x) = x^2 \\cdot e^{3x}$?",
                options: ["Nur Produktregel", "Nur Kettenregel", "Produkt- UND Kettenregel", "Potenzregel"],
                correct: 2,
                hints: ["$x^2$ mal $e^{3x}$ → Produkt. Aber $e^{3x}$ ist auch eine Verkettung!"]
            },
            {
                id: "mix2", type: "choice",
                question: "Welche Regel für $f(x) = \\sin(5x)$?",
                options: ["Produktregel", "Kettenregel", "Summenregel", "Keine spezielle"],
                correct: 1,
                hints: ["$\\sin$ von $5x$ — eine Funktion 'in' einer anderen."]
            },
            {
                id: "mix3",
                question: "Leite ab: $f(x) = 3x \\cdot (x+1)^2$\n\n(Kombination!)",
                answer: "3(x+1)^2+6x(x+1)",
                accepts: [
                    "3(x+1)^2+6x(x+1)", "3(x+1)(3x+1)", "9x^2+6x+3",
                    "(x+1)(9x+3)", "3(3x^2+2x+1)"
                ],
                hints: [
                    "Produktregel: $u=3x$, $v=(x+1)^2$",
                    "$u'=3$, $v'=2(x+1)$ (Kettenregel!)",
                    "$f' = 3 \\cdot (x+1)^2 + 3x \\cdot 2(x+1) = 3(x+1)^2 + 6x(x+1)$"
                ],
                errorPatterns: {}
            },
            {
                id: "mix4", type: "choice",
                question: "Welche Regel für $f(x) = e^{x^2+1}$?",
                options: ["Produktregel", "Kettenregel", "Produkt- und Kettenregel", "Summenregel"],
                correct: 1,
                hints: ["Innere Funktion: $x^2+1$, Äußere: $e^u$"]
            },
            {
                id: "mix5",
                question: "Leite ab: $f(x) = x \\cdot e^{-x}$",
                answer: "e^(-x)-x*e^(-x)",
                accepts: [
                    "e^(-x)-x*e^(-x)", "e^(-x)-xe^(-x)", "e^(-x)(1-x)", "(1-x)*e^(-x)",
                    "(1-x)e^(-x)", "e^{-x}(1-x)"
                ],
                hints: [
                    "Produktregel: $u=x$, $v=e^{-x}$",
                    "$u'=1$, $v'=-e^{-x}$ (Kettenregel: innere Abl. von $-x$ ist $-1$)",
                    "$f' = 1 \\cdot e^{-x} + x \\cdot (-e^{-x}) = e^{-x}(1-x)$"
                ],
                errorPatterns: {
                    "e^(-x)+x*e^(-x)": "Vorzeichen! $v'(x) = -e^{-x}$, also $u \\cdot v' = -xe^{-x}$"
                }
            }
        ],
        masteryThreshold: 0.8
    },

    // --------------------------------------------------------
    // ABSCHLUSSTEST
    // --------------------------------------------------------
    final: {
        title: "Abschlusstest",
        description: "Zeig was du kannst! Alle Regeln gemischt.",
        tasks: [
            {
                id: "f1", question: "Leite ab: $f(x) = x^2 \\cdot \\cos(x)$",
                answer: "2x*cos(x)-x^2*sin(x)",
                accepts: ["2x*cos(x)-x^2*sin(x)", "2xcos(x)-x^2sin(x)", "x(2cos(x)-xsin(x))"],
                hints: ["Produktregel: $u=x^2$, $v=\\cos(x)$"],
                errorPatterns: {}
            },
            {
                id: "f2", question: "Leite ab: $f(x) = e^{2x+1}$",
                answer: "2e^(2x+1)",
                accepts: ["2e^(2x+1)", "2*e^(2x+1)", "2e^{2x+1}"],
                hints: ["Kettenregel: Innere = $2x+1$, Innere Abl. = $2$"],
                errorPatterns: { "e^(2x+1)": "Innere Ableitung ($2$) vergessen!" }
            },
            {
                id: "f3", type: "choice",
                question: "Welche Regel(n) brauchst du für $f(x) = (x+1)^3 \\cdot e^x$?",
                options: ["Nur Produktregel", "Nur Kettenregel", "Produkt- UND Kettenregel", "Potenzregel"],
                correct: 2,
                hints: ["Produkt aus $(x+1)^3$ und $e^x$. Für $(x+1)^3$ brauchst du die Kettenregel."]
            },
            {
                id: "f4", question: "Leite ab: $f(x) = (4x-3)^5$",
                answer: "20(4x-3)^4",
                accepts: ["20(4x-3)^4", "20*(4x-3)^4", "5*4*(4x-3)^4"],
                hints: ["Kettenregel: $5 \\cdot (4x-3)^4 \\cdot 4$"],
                errorPatterns: { "5(4x-3)^4": "Innere Ableitung $4$ vergessen!" }
            },
            {
                id: "f5", question: "Leite ab: $f(x) = x^2 \\cdot e^{-x}$",
                answer: "2x*e^(-x)-x^2*e^(-x)",
                accepts: [
                    "2x*e^(-x)-x^2*e^(-x)", "e^(-x)(2x-x^2)", "(2x-x^2)*e^(-x)",
                    "e^(-x)*(2x-x^2)", "x*e^(-x)*(2-x)", "xe^(-x)(2-x)"
                ],
                hints: [
                    "Produktregel + Kettenregel für $e^{-x}$",
                    "$u=x^2, v=e^{-x}$ → $u'=2x, v'=-e^{-x}$"
                ],
                errorPatterns: {}
            }
        ],
        masteryThreshold: 0.8
    }
};

// Lernpfad-Reihenfolge
const UNIT_ORDER = ['diagnose', 'unit0', 'unit1', 'unit2', 'unit25', 'final'];

// Gemini API (domain-restricted to hbraak.github.io)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
// Key wird aus URL-Parameter geladen, Fallback leer
const GEMINI_API_KEY = new URLSearchParams(window.location.search).get('key') || '';
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_SYSTEM_PROMPT = `Du bist ein freundlicher Mathe-Tutor für Schüler der 12. Klasse an einem Berufskolleg.

REGELN:
1. Gib NIEMALS die Lösung direkt. Nutze die sokratische Methode.
2. Bei der ersten Frage: Gib einen HINWEIS (z.B. "Welche Regel brauchst du hier?")
3. Bei der zweiten Frage zum gleichen Thema: Zeige einen TEILSCHRITT
4. Bei der dritten Frage: Zeige den Lösungsweg und stelle eine Reflexionsfrage ("Warum funktioniert das so?")
5. Nutze LaTeX für Formeln: $...$
6. Sei ermutigend aber ehrlich
7. Antworte auf Deutsch
8. Thema: Produktregel und Kettenregel (Ableitungen)
9. Wenn Schüler persönliche Daten teilen, weise freundlich darauf hin, dass sie das nicht tun sollen.`;
