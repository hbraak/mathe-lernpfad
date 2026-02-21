// ============================================================
// LERNPFAD-DATEN: Produkt-/Kettenregel + Kurvendiskussion + Extremwertaufgaben
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
    // ANWENDUNGEN: Produkt- & Kettenregel
    // --------------------------------------------------------
    anwendungen1: {
    title: "Anwendungen: Produkt- & Kettenregel",
    description: "Tangenten, Extremstellen und physikalische Anwendungen — jetzt wird's konkret!",
    explanation: `
        <h3>Was kommt jetzt?</h3>
        <p>Du kannst die Produkt- und Kettenregel anwenden. Jetzt nutzen wir sie für konkrete Aufgaben:</p>
        <ul style="margin-left:1.5rem; line-height:2.2;">
            <li><strong>Tangentengleichung:</strong> $y = f'(x_0)(x - x_0) + f(x_0)$</li>
            <li><strong>Normalengleichung:</strong> $y = -\\frac{1}{f'(x_0)}(x - x_0) + f(x_0)$</li>
            <li><strong>Extremstellen:</strong> $f'(x) = 0$ und Vorzeichenwechsel / $f''(x)$ prüfen</li>
            <li><strong>Monotonie:</strong> $f'(x) > 0$ auf einem Intervall → dort streng steigend. Aber: Einzelne Stellen mit $f'=0$ brechen strenge Monotonie nicht!</li>
        </ul>
        <h3 style="margin-top:1.5rem;">Physikalische Anwendungen</h3>
        <p>Ableitungen beschreiben Änderungsraten — in der Physik z.B.:</p>
        <ul style="margin-left:1.5rem; line-height:2.2;">
            <li>Geschwindigkeit = Ableitung des Weges: $v(t) = s'(t)$</li>
            <li>Abkühlrate = Ableitung der Temperatur: $T'(t)$</li>
            <li>Beim Kondensator: $i_C(t) = C \\cdot U_C'(t)$</li>
        </ul>
    `,
    tasks: [
        {
            id: "anw1",
            question: "Bestimme die Tangentengleichung an $f(x) = x^2 \\cdot e^{-x}$ an der Stelle $x_0 = 1$.\n\n(Gib die Tangente in der Form $y = ...$ an.)",
            answer: "y=x/e",
            accepts: [
                "y=x/e", "y=x*e^(-1)", "y=xe^(-1)", "y=(1/e)*x",
                "y=x·e^(-1)", "y = x/e", "y = x * e^(-1)",
                "y=e^(-1)*x", "y=(e^(-1))*x"
            ],
            hints: [
                "Produktregel: $u = x^2$, $v = e^{-x}$ → $f'(x) = 2x \\cdot e^{-x} + x^2 \\cdot (-e^{-x}) = x(2-x)e^{-x}$",
                "Einsetzen: $f(1) = 1 \\cdot e^{-1} = \\frac{1}{e}$ und $f'(1) = 1 \\cdot 1 \\cdot e^{-1} = \\frac{1}{e}$",
                "Tangente: $y = \\frac{1}{e}(x - 1) + \\frac{1}{e} = \\frac{x}{e}$"
            ],
            errorPatterns: {
                "y=x*e^(-1)+e^(-1)": "Vereinfache! $\\frac{1}{e}(x-1) + \\frac{1}{e} = \\frac{x-1+1}{e} = \\frac{x}{e}$",
                "y=(2-x)*e^(-x)*x": "Das ist f'(x), nicht die Tangente! Tangente: $y = f'(x_0)(x - x_0) + f(x_0)$"
            }
        },
        {
            id: "anw2",
            question: "Bestimme die Extremstelle von $f(x) = x \\cdot e^{-x}$.\n\nGib den $x$-Wert an.",
            answer: "1",
            accepts: ["1", "x=1"],
            hints: [
                "Produktregel: $f'(x) = e^{-x} + x \\cdot (-e^{-x}) = (1-x) \\cdot e^{-x}$",
                "Setze $f'(x) = 0$: Da $e^{-x} \\neq 0$, muss $1-x = 0$ gelten.",
                "$x = 1$. Prüfe: $f''(x) = (x-2)e^{-x}$, also $f''(1) = -e^{-1} < 0$ → Maximum."
            ],
            errorPatterns: {
                "0": "$e^{-x}$ ist nie Null! Der Faktor $(1-x)$ muss Null sein.",
                "-1": "Vorzeichen beachten: $1 - x = 0 \\Rightarrow x = 1$"
            }
        },
        {
            id: "anw3",
            question: "Gegeben: $f(x) = (2x+1)^3$.\n\nIn welchen Intervallen ist $f$ streng monoton steigend?",
            type: "choice",
            options: [
                "$(-\\infty, -\\frac{1}{2})$ und $(-\\frac{1}{2}, \\infty)$",
                "$(-\\infty, \\infty)$ (überall)",
                "$(0, \\infty)$",
                "$(-\\frac{1}{2}, \\infty)$"
            ],
            correct: 1,
            hints: [
                "Kettenregel: $f'(x) = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$",
                "$f'(x) = 6(2x+1)^2 \\geq 0$ für alle $x$, und $f'(x) = 0$ nur bei $x = -\\frac{1}{2}$.",
                "$f$ ist Komposition streng steigender Funktionen ($2x+1$ und $u^3$) → streng monoton steigend auf ganz $\\mathbb{R}$. Eine einzelne Stelle mit $f'=0$ bricht die strenge Monotonie nicht!"
            ]
        },
        {
            id: "anw4",
            question: "Bestimme die Normalengleichung an $f(x) = e^{2x}$ an der Stelle $x_0 = 0$.\n\n(Gib die Normale als $y = ...$ an.)",
            answer: "y=-x/2+1",
            accepts: [
                "y=-x/2+1", "y=1-x/2", "y=-0.5x+1", "y=-0,5x+1",
                "y = -x/2 + 1", "y = 1 - x/2", "y=-(1/2)x+1"
            ],
            hints: [
                "Kettenregel: $f'(x) = 2e^{2x}$ → $f'(0) = 2$",
                "Normalensteigung = $-\\frac{1}{f'(0)} = -\\frac{1}{2}$. Und $f(0) = e^0 = 1$.",
                "Normale: $y = -\\frac{1}{2}(x - 0) + 1 = -\\frac{x}{2} + 1$"
            ],
            errorPatterns: {
                "y=2x+1": "Das ist die Tangente, nicht die Normale! Normalensteigung = $-1/m_{Tangente}$.",
                "y=-x/2": "Du hast den $y$-Achsenabschnitt vergessen! $f(0) = 1$."
            }
        },
        {
            id: "anw5",
            question: "Gegeben: $f(x) = x^3 \\cdot e^x$.\n\nDie Tangente an $x_0 = 1$ schneidet die $x$-Achse. Berechne den Schnittpunkt.\n\n(Gib den $x$-Wert als Bruch an.)",
            answer: "3/4",
            accepts: ["3/4", "0.75", "0,75", "x=3/4", "x=0.75"],
            hints: [
                "Produktregel: $f'(x) = 3x^2 e^x + x^3 e^x = x^2(x+3)e^x$ → $f'(1) = 4e$",
                "Tangente: $y = 4e(x - 1) + e = 4ex - 3e$. Setze $y = 0$.",
                "$4ex - 3e = 0 \\Rightarrow x = \\frac{3}{4}$"
            ],
            errorPatterns: {
                "4/3": "Rechne nochmal: $4ex = 3e \\Rightarrow x = \\frac{3}{4}$, nicht $\\frac{4}{3}$!",
                "1": "Das ist $x_0$, nicht der Schnittpunkt der Tangente mit der $x$-Achse."
            }
        },
        {
            id: "anw6",
            question: "**Bremsvorgang:** Ein Fahrzeug bewegt sich nach dem Weg-Zeit-Gesetz\n$$s(t) = t^2 \\cdot e^{-0{,}5t} \\quad (0 \\leq t \\leq 4)$$\n($s$ in Metern, $t$ in Sekunden).\n\nBerechne die Geschwindigkeit $v(t) = s'(t)$ und gib $v(2)$ an.\n\n(Angabe in der Form: $v(2) = ...$, gerundet auf 2 Dezimalen)",
            answer: "0.74",
            accepts: ["0.74", "0,74", "v(2)=0.74", "v(2)=0,74", "2/e", "2*e^(-1)", "2e^(-1)"],
            hints: [
                "Produktregel: $u = t^2$, $v = e^{-0{,}5t}$ → $u' = 2t$, $v' = -0{,}5 \\cdot e^{-0{,}5t}$",
                "$v(t) = s'(t) = 2t \\cdot e^{-0{,}5t} + t^2 \\cdot (-0{,}5 \\cdot e^{-0{,}5t}) = t(2 - 0{,}5t) \\cdot e^{-0{,}5t}$",
                "$v(2) = 2 \\cdot (2 - 1) \\cdot e^{-1} = 2e^{-1} \\approx 0{,}74$ m/s"
            ],
            errorPatterns: {
                "1.47": "Hast du $t=2$ in $s(t)$ statt in $s'(t)$ eingesetzt? Gesucht ist die Geschwindigkeit!",
                "-0.74": "Vorzeichen prüfen! Bei $t=2$ ist $(2 - 0{,}5 \\cdot 2) = 1 > 0$."
            }
        },
        {
            id: "anw7",
            question: "**Wechselstromleistung:** An einem Bauteil liegen an:\n$$U(t) = 5 \\cdot \\sin(100\\pi t), \\quad I(t) = 2 \\cdot \\cos(100\\pi t)$$\n($U$ in Volt, $I$ in Ampere, $t$ in Sekunden).\n\nDie Momentanleistung ist $P(t) = U(t) \\cdot I(t)$.\n\nBerechne $P'(t)$ mit der Produktregel.\n\n(Vereinfache mit $\\sin(2\\alpha) = 2\\sin\\alpha\\cos\\alpha$)",
            answer: "1000*pi*cos(200*pi*t)",
            accepts: [
                "1000*pi*cos(200*pi*t)", "1000π·cos(200πt)",
                "1000*pi*cos(200*pi*t)", "1000pi*cos(200pit)",
                "1000πcos(200πt)"
            ],
            hints: [
                "Vereinfache erst: $P(t) = 10\\sin(100\\pi t)\\cos(100\\pi t) = 5\\sin(200\\pi t)$",
                "Jetzt Kettenregel: $P'(t) = 5 \\cdot \\cos(200\\pi t) \\cdot 200\\pi$",
                "$P'(t) = 1000\\pi \\cdot \\cos(200\\pi t)$"
            ],
            errorPatterns: {
                "500*pi*cos(100*pi*t)": "Hast du die Doppelwinkelformel vergessen? $10\\sin\\alpha\\cos\\alpha = 5\\sin(2\\alpha)$"
            }
        },
        {
            id: "anw8",
            question: "**Kondensator-Ladekurve:** Ein Kondensator ($C = 2\\,\\mu\\text{F}$, $R = 1\\,\\text{k}\\Omega$) wird auf $U_0 = 10\\,\\text{V}$ geladen:\n$$U_C(t) = 10 \\cdot \\left(1 - e^{-500t}\\right)$$\n($t$ in Sekunden, $RC = 0{,}002\\,\\text{s}$).\n\nBerechne die Änderungsrate $U_C'(t)$ und gib $U_C'(0)$ in V/s an.",
            answer: "5000",
            accepts: ["5000", "5000 V/s", "5000V/s", "U_C'(0)=5000"],
            hints: [
                "Kettenregel: Innere Funktion $g(t) = -500t$ → $g'(t) = -500$",
                "$U_C'(t) = 10 \\cdot (-1) \\cdot e^{-500t} \\cdot (-500) = 5000 \\cdot e^{-500t}$",
                "$U_C'(0) = 5000 \\cdot e^0 = 5000$ V/s"
            ],
            errorPatterns: {
                "10": "Du hast nur $U_C(0)$ berechnet — gesucht ist $U_C'(0)$!",
                "-5000": "Vorzeichen! $10 \\cdot (-1) \\cdot (-500) = +5000$."
            }
        },
        {
            id: "anw9",
            question: "**Abkühlung (Newton):** Ein Bauteil kühlt nach dem Gesetz\n$$T(t) = 20 + 80 \\cdot e^{-0{,}1t}$$\n($T$ in °C, $t$ in Minuten) ab.\n\nBerechne die Abkühlrate $T'(t)$ und gib $T'(0)$ in °C/min an.",
            answer: "-8",
            accepts: ["-8", "-8 °C/min", "-8°C/min", "T'(0)=-8"],
            hints: [
                "Die Konstante $20$ fällt weg. Kettenregel auf $80 \\cdot e^{-0{,}1t}$ anwenden.",
                "$T'(t) = 80 \\cdot e^{-0{,}1t} \\cdot (-0{,}1) = -8 \\cdot e^{-0{,}1t}$",
                "$T'(0) = -8 \\cdot e^0 = -8$ °C/min"
            ],
            errorPatterns: {
                "8": "Die Temperatur sinkt — die Änderungsrate muss negativ sein!",
                "-80": "Du hast nur mit $80$ multipliziert, aber $(-0{,}1) \\cdot 80 = -8$."
            }
        },
        {
            id: "anw10",
            question: "**Bremsvorgang (Fortsetzung):** Für $s(t) = t^2 \\cdot e^{-0{,}5t}$ (aus Aufgabe 6):\n\nBei welchem Zeitpunkt $t$ ist die Geschwindigkeit $v(t) = s'(t)$ maximal?\n\n(Tipp: $v'(t) = 0$ setzen. Gib den $t$-Wert an.)",
            answer: "4-2*sqrt(2)",
            accepts: ["4-2*sqrt(2)", "4-2√2", "4-2*wurzel(2)", "1.17", "1,17"],
            hints: [
                "Wir brauchen $v'(t) = s''(t) = 0$. Aus Aufgabe 6: $v(t) = t(2-0{,}5t)e^{-0{,}5t}$",
                "$s''(t) = \\frac{1}{4}(t^2 - 8t + 8)e^{-0{,}5t}$. Da $e^{-0{,}5t} \\neq 0$: Löse $t^2 - 8t + 8 = 0$.",
                "pq-Formel: $t = 4 \\pm \\sqrt{16-8} = 4 \\pm 2\\sqrt{2}$. Der kleinere Wert $t = 4 - 2\\sqrt{2} \\approx 1{,}17$ s ist das Maximum. Der größere ($t \\approx 6{,}83$) liegt außerhalb des Gültigkeitsbereichs $0 \\leq t \\leq 4$."
            ],
            errorPatterns: {
                "4": "$t = 4$ ist die Nullstelle von $v(t)$, nicht das Maximum! Setze $v'(t) = s''(t) = 0$.",
                "0": "Bei $t = 0$ ist $v(0) = 0$ — das ist ein Minimum, nicht das Maximum.",
                "2": "Hast du geraten? Löse $t^2 - 8t + 8 = 0$ mit der pq-Formel."
            }
        }
    ],
    masteryThreshold: 0.7
    },

    // ============================================================
    // LERNPFAD 2: Kurvendiskussion & Extremwertaufgaben
    // ============================================================

    // --------------------------------------------------------
    // DIAGNOSE 2: Einstiegsdiagnose Kurvendiskussion
    // --------------------------------------------------------
    diagnose2: {
        title: "Diagnose: Kurvendiskussion",
        description: "Teste dein Vorwissen zu Extremstellen, Wendepunkten und Monotonie.",
        tasks: [
            {
                id: "d2_1",
                question: "Bestimme die Extremstellen von $f(x) = x^3 - 3x$.\n\nGib beide $x$-Werte an (kommagetrennt).",
                answer: "-1, 1",
                accepts: ["-1, 1", "-1,1", "1, -1", "1,-1", "x=-1, x=1", "-1 und 1"],
                hints: [
                    "$f'(x) = 3x^2 - 3$. Setze $f'(x) = 0$.",
                    "$3x^2 - 3 = 0 \\Rightarrow x^2 = 1$",
                    "$x_1 = -1$ und $x_2 = 1$"
                ],
                errorPatterns: {
                    "0": "$f'(0) = -3 \\neq 0$. Löse $3x^2 - 3 = 0$!",
                    "3": "Du hast $f'(x) = 0$ nicht korrekt gelöst. $3x^2 = 3 \\Rightarrow x^2 = 1$."
                }
            },
            {
                id: "d2_2",
                question: "Gegeben: $f(x) = x^3 - 3x$, Extremstellen bei $x = -1$ und $x = 1$.\n\nWelche Art von Extremum liegt bei $x = -1$ vor?",
                type: "choice",
                options: ["Maximum", "Minimum", "Sattelpunkt", "Wendepunkt"],
                correct: 0,
                hints: [
                    "$f''(x) = 6x$. Berechne $f''(-1)$.",
                    "$f''(-1) = -6 < 0$ → ?",
                    "Negative zweite Ableitung = Linkskrümmung = Maximum."
                ]
            },
            {
                id: "d2_3",
                question: "Bestimme die Wendestelle von $f(x) = x^3 - 3x$.\n\nGib den $x$-Wert an.",
                answer: "0",
                accepts: ["0", "x=0"],
                hints: [
                    "Wendepunkt: $f''(x) = 0$ und Vorzeichenwechsel.",
                    "$f''(x) = 6x = 0 \\Rightarrow x = 0$",
                    "$f'''(x) = 6 \\neq 0$, also ist $x=0$ tatsächlich Wendepunkt."
                ],
                errorPatterns: {
                    "1": "Das ist eine Extremstelle, kein Wendepunkt! Setze $f''(x) = 0$.",
                    "-1": "Das ist eine Extremstelle. Wendepunkt: $f''(x) = 0$, nicht $f'(x) = 0$."
                }
            },
            {
                id: "d2_4",
                question: "In welchem Intervall ist $f(x) = x^3 - 3x$ streng monoton fallend?",
                type: "choice",
                options: ["$(-\\infty, -1)$", "$(-1, 1)$", "$(1, \\infty)$", "$(-\\infty, 0)$"],
                correct: 1,
                hints: [
                    "Monoton fallend: $f'(x) < 0$. Und $f'(x) = 3x^2 - 3 = 3(x^2 - 1)$.",
                    "$f'(x) < 0$ wenn $x^2 < 1$, also $-1 < x < 1$.",
                    "Im Intervall $(-1, 1)$ ist $f$ streng monoton fallend."
                ]
            },
            {
                id: "d2_5",
                question: "Bestimme die Extremstellen von $f(x) = 2x^3 - 6x^2 + 3$.\n\nGib beide $x$-Werte an.",
                answer: "0, 2",
                accepts: ["0, 2", "0,2", "2, 0", "2,0", "x=0, x=2", "0 und 2"],
                hints: [
                    "$f'(x) = 6x^2 - 12x = 6x(x-2)$",
                    "Setze $f'(x) = 0$: $6x(x-2) = 0$",
                    "$x_1 = 0$ und $x_2 = 2$"
                ],
                errorPatterns: {
                    "1": "Das ist nicht korrekt. Faktorisiere: $6x^2 - 12x = 6x(x-2) = 0$.",
                    "6": "Du hast $f'(x)$ nicht gleich Null gesetzt, sondern vielleicht $f''$?"
                }
            },
            {
                id: "d2_6",
                question: "Was beschreibt der Wendepunkt geometrisch?",
                type: "choice",
                options: [
                    "Stelle, wo $f$ den größten Wert hat",
                    "Stelle, wo die Steigung maximal oder minimal ist",
                    "Stelle, wo $f$ die Krümmung wechselt",
                    "Stelle, wo $f$ die $x$-Achse schneidet"
                ],
                correct: 2,
                hints: [
                    "Wendepunkt hat mit der Krümmung zu tun.",
                    "Krümmung wird durch $f''$ beschrieben. Bei $f'' = 0$ mit VZW...",
                    "Der Wendepunkt ist die Stelle, wo der Graph von Links- zu Rechtskrümmung wechselt (oder umgekehrt)."
                ]
            },
            {
                id: "d2_7",
                question: "Der Graph von $f'(x)$ schneidet die $x$-Achse bei $x = 2$ von positiv nach negativ.\n\nWas bedeutet das für $f(x)$ bei $x = 2$?",
                type: "choice",
                options: [
                    "$f$ hat einen Wendepunkt",
                    "$f$ hat ein Minimum",
                    "$f$ hat ein Maximum",
                    "$f$ hat eine Nullstelle"
                ],
                correct: 2,
                hints: [
                    "$f'$ geht von positiv nach negativ → $f'$ wechselt das Vorzeichen.",
                    "$f'(x) > 0$ davor (steigend), $f'(x) < 0$ danach (fallend).",
                    "Steigend → fallend = Maximum."
                ]
            },
            {
                id: "d2_8",
                question: "Berechne die Wendestellen von $f(x) = x^4 - 4x^2$.\n\n(Gib beide $x$-Werte exakt oder auf 2 Dezimalen an.)",
                answer: "-sqrt(6)/3, sqrt(6)/3",
                accepts: [
                    "-sqrt(6)/3, sqrt(6)/3", "sqrt(6)/3, -sqrt(6)/3",
                    "-0.82, 0.82", "0.82, -0.82", "-0,82, 0,82",
                    "-√6/3, √6/3", "±sqrt(6)/3", "+-sqrt(6)/3"
                ],
                hints: [
                    "$f''(x) = 12x^2 - 8$. Setze $f''(x) = 0$.",
                    "$12x^2 - 8 = 0 \\Rightarrow x^2 = \\frac{2}{3}$",
                    "$x = \\pm\\sqrt{\\frac{2}{3}} = \\pm\\frac{\\sqrt{6}}{3} \\approx \\pm 0{,}82$"
                ],
                errorPatterns: {
                    "0": "$f''(0) = -8 \\neq 0$. Löse $12x^2 - 8 = 0$!",
                    "2, -2": "Das sind die Nullstellen von $f'$, nicht von $f''$!"
                }
            }
        ],
        masteryThreshold: 0.8
    },

    // --------------------------------------------------------
    // KURVENDISKUSSION
    // --------------------------------------------------------
    kurvendisk: {
        title: "Kurvendiskussion",
        description: "Analysiere Funktionen systematisch: Extrema, Wendepunkte, Monotonie, Skizze.",
        explanation: `
            <h3>Schema einer Kurvendiskussion</h3>
            <ol style="margin-left:1.5rem; line-height:2.2;">
                <li><strong>Definitionsbereich:</strong> Wo ist $f$ definiert?</li>
                <li><strong>Symmetrie:</strong> $f(-x) = f(x)$ → achsensymmetrisch, $f(-x) = -f(x)$ → punktsymmetrisch</li>
                <li><strong>Nullstellen:</strong> $f(x) = 0$</li>
                <li><strong>Extremstellen:</strong> $f'(x) = 0$ + Vorzeichenwechsel oder $f''(x_0) \\neq 0$</li>
                <li><strong>Wendepunkte:</strong> $f''(x) = 0$ + Vorzeichenwechsel oder $f'''(x_0) \\neq 0$</li>
                <li><strong>Randverhalten:</strong> $\\lim_{x \\to \\pm\\infty} f(x)$</li>
            </ol>
            <h3 style="margin-top:1.5rem;">Wichtige Zusammenhänge</h3>
            <ul style="margin-left:1.5rem; line-height:2.2;">
                <li>$f'(x) > 0$ → $f$ steigt, $f'(x) < 0$ → $f$ fällt</li>
                <li>$f''(x) > 0$ → Linkskrümmung (Tal), $f''(x) < 0$ → Rechtskrümmung (Berg)</li>
                <li>Wendepunkt von $f$ = Extremstelle von $f'$</li>
            </ul>
        `,
        tasks: [
            {
                id: "kd1",
                question: "Bestimme alle Nullstellen von $f(x) = x^3 - 3x$.",
                answer: "0, -sqrt(3), sqrt(3)",
                accepts: [
                    "0, -sqrt(3), sqrt(3)", "0, sqrt(3), -sqrt(3)",
                    "-sqrt(3), 0, sqrt(3)", "0, -1.73, 1.73",
                    "0, -√3, √3", "0,-√3,√3", "-1.73, 0, 1.73"
                ],
                hints: [
                    "Ausklammern: $x^3 - 3x = x(x^2 - 3)$",
                    "$x(x^2 - 3) = 0$: Entweder $x = 0$ oder $x^2 = 3$",
                    "$x_1 = 0$, $x_2 = -\\sqrt{3} \\approx -1{,}73$, $x_3 = \\sqrt{3} \\approx 1{,}73$"
                ],
                errorPatterns: {
                    "0, 3, -3": "$x^2 = 3$, also $x = \\pm\\sqrt{3}$, nicht $\\pm 3$!",
                    "0": "Da fehlen zwei! Löse auch $x^2 - 3 = 0$."
                }
            },
            {
                id: "kd2",
                question: "Ist $f(x) = x^3 - 3x$ achsensymmetrisch, punktsymmetrisch oder weder noch?",
                type: "choice",
                options: ["Achsensymmetrisch zur $y$-Achse", "Punktsymmetrisch zum Ursprung", "Weder noch"],
                correct: 1,
                hints: [
                    "Prüfe: $f(-x) = (-x)^3 - 3(-x) = -x^3 + 3x$",
                    "Vergleiche mit $-f(x) = -(x^3 - 3x) = -x^3 + 3x$",
                    "$f(-x) = -f(x)$ → punktsymmetrisch zum Ursprung."
                ]
            },
            {
                id: "kd3",
                question: "Führe eine Kurvendiskussion von $f(x) = x^3 - 3x$ durch.\n\nGib den $y$-Wert des lokalen Maximums an.",
                answer: "2",
                accepts: ["2", "f(-1)=2", "y=2"],
                hints: [
                    "Extremstellen: $f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$",
                    "$f''(-1) = -6 < 0$ → Maximum bei $x = -1$.",
                    "$f(-1) = (-1)^3 - 3 \\cdot (-1) = -1 + 3 = 2$"
                ],
                errorPatterns: {
                    "-2": "Das ist der $y$-Wert des Minimums bei $x=1$. Gefragt ist das Maximum!",
                    "-1": "Das ist die $x$-Koordinate. Gefragt ist der $y$-Wert: $f(-1) = ?$"
                }
            },
            {
                id: "kd4",
                question: "Bestimme die Extremstellen von $f(x) = x \\cdot e^{-x}$.\n\nGib den $x$-Wert und die Art (Max/Min) an.",
                answer: "x=1, Maximum",
                accepts: ["x=1, Maximum", "1, Maximum", "1, Max", "Maximum bei x=1", "x=1 Maximum", "1 Max"],
                hints: [
                    "Produktregel: $f'(x) = e^{-x} + x(-e^{-x}) = (1-x)e^{-x}$",
                    "$f'(x) = 0$: Da $e^{-x} \\neq 0$, muss $1-x = 0$, also $x = 1$.",
                    "$f''(x) = (x-2)e^{-x}$, $f''(1) = -e^{-1} < 0$ → Maximum."
                ],
                errorPatterns: {
                    "0": "$f'(0) = 1 \\neq 0$. Löse $(1-x) = 0$!",
                    "x=1, Minimum": "Prüfe das Vorzeichen von $f''(1)$: $f''(1) = -e^{-1} < 0$ → Maximum, nicht Minimum!"
                }
            },
            {
                id: "kd5",
                question: "Bestimme den Wendepunkt von $f(x) = x \\cdot e^{-x}$.\n\nGib den $x$-Wert an.",
                answer: "2",
                accepts: ["2", "x=2"],
                hints: [
                    "$f''(x) = (x-2)e^{-x}$. Setze $f''(x) = 0$.",
                    "Da $e^{-x} \\neq 0$: $x - 2 = 0$",
                    "$x = 2$. Prüfe: $f'''(x) = (3-x)e^{-x}$, also $f'''(2) = e^{-2} \\neq 0$ ✓"
                ],
                errorPatterns: {
                    "1": "Das ist die Extremstelle! Wendepunkt: $f''(x) = 0$, nicht $f'(x) = 0$."
                }
            },
            {
                id: "kd6",
                question: "Bestimme die Extremstellen von $f(x) = x^2 \\cdot e^{-x}$.\n\nGib beide $x$-Werte an.",
                answer: "0, 2",
                accepts: ["0, 2", "0,2", "2, 0", "2,0", "x=0, x=2", "0 und 2"],
                hints: [
                    "Produktregel: $f'(x) = 2x \\cdot e^{-x} + x^2(-e^{-x}) = x(2-x)e^{-x}$",
                    "$f'(x) = 0$: $x(2-x) = 0$ (da $e^{-x} \\neq 0$)",
                    "$x_1 = 0$ (Minimum) und $x_2 = 2$ (Maximum)"
                ],
                errorPatterns: {
                    "2": "Es gibt noch eine zweite Extremstelle! $x(2-x) = 0$ hat zwei Lösungen.",
                    "0": "Es gibt noch $x = 2$! Löse $x(2-x) = 0$ vollständig."
                }
            },
            {
                id: "kd7",
                question: "Wie verhält sich $f(x) = x^2 \\cdot e^{-x}$ für $x \\to +\\infty$?",
                type: "choice",
                options: [
                    "$f(x) \\to +\\infty$",
                    "$f(x) \\to 0$",
                    "$f(x) \\to -\\infty$",
                    "$f(x) \\to 1$"
                ],
                correct: 1,
                hints: [
                    "Wer wächst schneller: $x^2$ oder $e^x$?",
                    "$e^x$ wächst viel schneller als jedes Polynom → $\\frac{x^2}{e^x} \\to 0$",
                    "Die Exponentialfunktion dominiert: $\\lim_{x \\to \\infty} x^2 e^{-x} = 0$"
                ]
            },
            {
                id: "kd8",
                question: "Bestimme die Wendestellen von $f(x) = x^2 \\cdot e^{-x}$.\n\n(Gib beide $x$-Werte exakt oder auf 2 Dezimalen an.)",
                answer: "2-sqrt(2), 2+sqrt(2)",
                accepts: [
                    "2-sqrt(2), 2+sqrt(2)", "2+sqrt(2), 2-sqrt(2)",
                    "0.59, 3.41", "0,59, 3,41", "2-√2, 2+√2", "2±√2"
                ],
                hints: [
                    "$f''(x) = (x^2 - 4x + 2)e^{-x}$. Setze $f''(x) = 0$.",
                    "$x^2 - 4x + 2 = 0$. pq-Formel: $x = 2 \\pm \\sqrt{4-2}$",
                    "$x_1 = 2 - \\sqrt{2} \\approx 0{,}59$ und $x_2 = 2 + \\sqrt{2} \\approx 3{,}41$"
                ],
                errorPatterns: {
                    "0, 2": "Das sind die Extremstellen (aus $f' = 0$), nicht die Wendestellen! Löse $f'' = 0$."
                }
            },
            {
                id: "kd9",
                question: "Welche Aussage über $f(x) = x^3 - 3x$ ist korrekt?",
                type: "choice",
                options: [
                    "Lokales Maximum bei $(1, -2)$, Minimum bei $(-1, 2)$",
                    "Lokales Maximum bei $(-1, 2)$, Minimum bei $(1, -2)$",
                    "Lokales Maximum bei $(0, 0)$, kein Minimum",
                    "Kein Extremum, da $f$ unbeschränkt ist"
                ],
                correct: 1,
                hints: [
                    "$f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$",
                    "$f(-1) = -1+3 = 2$, $f(1) = 1-3 = -2$",
                    "$f''(-1) = -6 < 0$ → Max bei $(-1, 2)$. $f''(1) = 6 > 0$ → Min bei $(1, -2)$."
                ]
            },
            {
                id: "kd10",
                question: "Für $f(x) = x \\cdot e^{-x}$: Berechne den $y$-Wert des Wendepunkts.\n\n(Gib den exakten Wert an.)",
                answer: "2e^(-2)",
                accepts: ["2e^(-2)", "2*e^(-2)", "2/e^2", "2/e²", "2e^{-2}", "0.27"],
                hints: [
                    "Wendestelle bei $x = 2$ (aus vorheriger Aufgabe).",
                    "Einsetzen: $f(2) = 2 \\cdot e^{-2}$",
                    "$f(2) = 2e^{-2} = \\frac{2}{e^2} \\approx 0{,}27$"
                ],
                errorPatterns: {
                    "e^(-1)": "Das ist $f(1)$, nicht $f(2)$! Setze $x = 2$ ein.",
                    "1/e": "Das ist $f(1) = e^{-1}$. Der Wendepunkt liegt bei $x = 2$."
                }
            }
        ],
        masteryThreshold: 0.7
    },

    // --------------------------------------------------------
    // EXTREMWERTAUFGABEN
    // --------------------------------------------------------
    extremwert: {
        title: "Extremwertaufgaben",
        description: "Optimierungsprobleme lösen: Zielfunktion + Nebenbedingung.",
        explanation: `
            <h3>Schema für Extremwertaufgaben</h3>
            <ol style="margin-left:1.5rem; line-height:2.2;">
                <li><strong>Skizze</strong> anfertigen, Variablen benennen</li>
                <li><strong>Zielfunktion</strong> aufstellen (was soll max/min werden?)</li>
                <li><strong>Nebenbedingung</strong> aufstellen (welche Einschränkung gilt?)</li>
                <li><strong>Einsetzen:</strong> Nebenbedingung in Zielfunktion → Funktion mit einer Variablen</li>
                <li><strong>Ableiten</strong> und $f'(x) = 0$ lösen</li>
                <li><strong>Überprüfen:</strong> $f''(x_0)$ für Max/Min, Randwerte beachten</li>
                <li><strong>Antwort</strong> im Sachkontext formulieren</li>
            </ol>
            <h3 style="margin-top:1.5rem;">Typische Nebenbedingungen</h3>
            <ul style="margin-left:1.5rem; line-height:2.2;">
                <li>Fester Umfang: $U = 2a + 2b$ → $b = \\frac{U}{2} - a$</li>
                <li>Festes Volumen: $V = \\pi r^2 h$ → $h = \\frac{V}{\\pi r^2}$</li>
                <li>Punkt auf Graph: $y = f(x)$ → eine Variable eliminieren</li>
            </ul>
        `,
        tasks: [
            {
                id: "ew1",
                question: "**Rechteck:** Ein Rechteck hat den Umfang $U = 20\\,\\text{cm}$.\n\nBestimme die Seitenlänge $a$, für die der Flächeninhalt maximal wird.\n\n(Gib $a$ in cm an.)",
                answer: "5",
                accepts: ["5", "a=5", "5 cm", "a=b=5"],
                hints: [
                    "Nebenbedingung: $2a + 2b = 20 \\Rightarrow b = 10 - a$",
                    "Zielfunktion: $A(a) = a \\cdot (10 - a) = 10a - a^2$",
                    "$A'(a) = 10 - 2a = 0 \\Rightarrow a = 5$. Also $a = b = 5$ (Quadrat!)."
                ],
                errorPatterns: {
                    "10": "Das ist der halbe Umfang. Die Seitenlänge ist $a = 5$.",
                    "25": "Das ist die maximale Fläche, nicht die Seitenlänge."
                }
            },
            {
                id: "ew2",
                question: "**Rechteck (Forts.):** Wie groß ist die maximale Fläche bei $U = 20\\,\\text{cm}$?\n\n(Angabe in cm².)",
                answer: "25",
                accepts: ["25", "25 cm²", "25cm²", "A=25"],
                hints: [
                    "Aus vorheriger Aufgabe: $a = b = 5$",
                    "$A = a \\cdot b = 5 \\cdot 5$",
                    "$A_{\\max} = 25\\,\\text{cm}^2$"
                ],
                errorPatterns: {
                    "5": "Das ist die Seitenlänge, nicht die Fläche! $A = 5 \\cdot 5 = 25$."
                }
            },
            {
                id: "ew3",
                question: "**Rinne:** Aus einem $12\\,\\text{cm}$ breiten Blech wird eine U-förmige Rinne gebogen (Höhe $h$, Breite $12 - 2h$).\n\nBei welcher Höhe $h$ ist der Querschnitt maximal? (in cm)",
                answer: "3",
                accepts: ["3", "h=3", "3 cm", "3cm"],
                hints: [
                    "Querschnittsfläche: $A(h) = h \\cdot (12 - 2h) = 12h - 2h^2$",
                    "$A'(h) = 12 - 4h = 0$",
                    "$h = 3\\,\\text{cm}$. Maximaler Querschnitt: $A(3) = 3 \\cdot 6 = 18\\,\\text{cm}^2$."
                ],
                errorPatterns: {
                    "6": "Das ist die Breite der Rinne bei $h = 3$, nicht die Höhe!",
                    "18": "Das ist die maximale Fläche, nicht die Höhe."
                }
            },
            {
                id: "ew4",
                question: "**Dose:** Eine zylindrische Dose soll $V = 500\\,\\text{cm}^3$ fassen. Die Oberfläche $A = 2\\pi r^2 + 2\\pi rh$ soll minimal sein.\n\nStelle $A$ als Funktion von $r$ allein auf.\n\n(Nutze $h = \\frac{500}{\\pi r^2}$.)",
                answer: "2*pi*r^2+1000/r",
                accepts: [
                    "2*pi*r^2+1000/r", "2πr²+1000/r", "2*pi*r^2 + 1000/r",
                    "2pi*r^2+1000/r", "2πr² + 1000/r"
                ],
                hints: [
                    "Nebenbedingung: $V = \\pi r^2 h = 500 \\Rightarrow h = \\frac{500}{\\pi r^2}$",
                    "Einsetzen: $A(r) = 2\\pi r^2 + 2\\pi r \\cdot \\frac{500}{\\pi r^2}$",
                    "Vereinfachen: $A(r) = 2\\pi r^2 + \\frac{1000}{r}$"
                ],
                errorPatterns: {
                    "2*pi*r^2+500/r": "$2\\pi r \\cdot \\frac{500}{\\pi r^2} = \\frac{1000}{r}$, nicht $\\frac{500}{r}$."
                }
            },
            {
                id: "ew5",
                question: "**Dose (Forts.):** Für $A(r) = 2\\pi r^2 + \\frac{1000}{r}$: Berechne den optimalen Radius.\n\n(Auf 2 Dezimalen, in cm.)",
                answer: "4.30",
                accepts: ["4.30", "4,30", "4.3", "4,3", "r=4.30", "r=4.3"],
                hints: [
                    "$A'(r) = 4\\pi r - \\frac{1000}{r^2}$. Setze $A'(r) = 0$.",
                    "$4\\pi r = \\frac{1000}{r^2} \\Rightarrow r^3 = \\frac{250}{\\pi}$",
                    "$r = \\sqrt[3]{\\frac{250}{\\pi}} \\approx 4{,}30\\,\\text{cm}$"
                ],
                errorPatterns: {}
            },
            {
                id: "ew6",
                question: "**Leistungsanpassung:** Spannungsquelle $U = 10\\,\\text{V}$, $R_i = 50\\,\\Omega$, Lastwiderstand $R$:\n$$P(R) = \\frac{100R}{(R+50)^2}$$\n\nBei welchem $R$ ist $P$ maximal? (in $\\Omega$)",
                answer: "50",
                accepts: ["50", "R=50", "50 Ohm", "50Ω", "R=Ri"],
                hints: [
                    "$P'(R) = \\frac{100(50-R)}{(R+50)^3}$. Setze $P'(R) = 0$.",
                    "$50 - R = 0 \\Rightarrow R = 50$",
                    "$R = R_i = 50\\,\\Omega$ — das ist die **Leistungsanpassung**!"
                ],
                errorPatterns: {
                    "0": "Bei $R = 0$ (Kurzschluss) ist $P = 0$!",
                    "100": "Leite ab: $P'(R) = \\frac{100(50-R)}{(R+50)^3} = 0 \\Rightarrow R = 50$."
                }
            },
            {
                id: "ew7",
                question: "**Leistungsanpassung (Forts.):** $P_{\\max}$ bei $R = 50\\,\\Omega$?\n\n(in Watt)",
                answer: "0.5",
                accepts: ["0.5", "0,5", "1/2", "0.5 W", "0,5 W", "P=0.5"],
                hints: [
                    "$P(50) = \\frac{100 \\cdot 50}{(50+50)^2}$",
                    "$= \\frac{5000}{10000}$",
                    "$P_{\\max} = 0{,}5\\,\\text{W}$"
                ],
                errorPatterns: {
                    "2": "$\\frac{5000}{10000} = 0{,}5$, nicht $2$.",
                    "1": "$\\frac{5000}{10000} = 0{,}5$, nicht $1$."
                }
            },
            {
                id: "ew8",
                question: "**Zaun:** Rechteckiges Grundstück an einer Mauer (eine Seite frei). $24\\,\\text{m}$ Zaun verfügbar.\n\nBestimme $a$ (parallel zur Mauer) und $b$ (senkrecht) für maximale Fläche.\n\n(Gib $a$ und $b$ in m an.)",
                answer: "12, 6",
                accepts: ["12, 6", "12,6", "a=12, b=6", "12 und 6"],
                hints: [
                    "NB: $a + 2b = 24$ (Mauer ersetzt eine Seite!) → $a = 24 - 2b$",
                    "Zielfunktion: $A(b) = (24-2b) \\cdot b = 24b - 2b^2$",
                    "$A'(b) = 24 - 4b = 0 \\Rightarrow b = 6$, also $a = 12$."
                ],
                errorPatterns: {
                    "6, 6": "Die Mauer ersetzt eine Seite! NB ist $a + 2b = 24$, nicht $2a + 2b = 24$.",
                    "8, 8": "Das wäre ohne Mauer. Hier: $a + 2b = 24$."
                }
            }
        ],
        masteryThreshold: 0.7
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
const UNIT_ORDER = ['diagnose', 'unit0', 'unit1', 'unit2', 'unit25', 'anwendungen1', 'diagnose2', 'kurvendisk', 'extremwert', 'final'];

// Gemini API (domain-restricted to hbraak.github.io)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
// Keys aus URL-Parametern
const GEMINI_API_KEY = new URLSearchParams(window.location.search).get('key') || '';
const GITHUB_TOKEN = new URLSearchParams(window.location.search).get('ghtoken') || '';
const GIST_ID = '1adfc536c05ff59f6448fb95dcd3bb92';
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
8. Thema: Produktregel, Kettenregel, Kurvendiskussion und Extremwertaufgaben
9. Wenn Schüler persönliche Daten teilen, weise freundlich darauf hin, dass sie das nicht tun sollen.`;
