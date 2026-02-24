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
    // LERNPFAD 2: Extremwertaufgaben — Modellieren & Optimieren
    // (AS 6: Anwendungen der Differentialrechnung)
    // ============================================================

    // --------------------------------------------------------
    // ============================================================
    // LP2: ANWENDUNGEN DER DIFFERENTIALRECHNUNG (AS 6)
    // Bildungsplan: t3bgy_te_mathe_gk, AS 6, 30–40 UStd
    // Z1: Steckbriefaufgaben (Funktionsrekonstruktion, Gauß, LGS)
    // Z2/Z3: Regression + Bestimmtheitsmaß + Prognosen
    // Z4: Abschnittsweise definierte Funktionen (Stetigkeit, Diff.)
    // Z5: Modellkritik (Grenzen ganzrationaler Funktionen)
    // ============================================================

    diagnose2: {
        title: "Diagnose: Modellierung",
        description: "Prüfe dein Vorwissen: LGS lösen, Bedingungen aufstellen, Modelle beurteilen.",
        tasks: [
            {
                id: "d2_1",
                question: "Bestimme alle Extremstellen von $f(x) = x^3 - 6x^2 + 9x + 1$.\n\nGib die $x$-Werte an (aufsteigend, mit Komma getrennt).",
                answer: "1, 3",
                accepts: ["1, 3", "1,3", "x=1, x=3", "1;3", "1 und 3"],
                hints: [
                    "$f'(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)$",
                    "Nullstellen: $x_1 = 1$, $x_2 = 3$.",
                    "$f''(1) = -6 < 0$ → Max. $f''(3) = 6 > 0$ → Min."
                ],
                errorPatterns: {
                    "3": "Es gibt ZWEI Extremstellen. Faktorisiere $f'(x) = 3(x-1)(x-3)$.",
                    "1": "Noch eine! $f'(x) = 3(x-1)(x-3) = 0$ → $x = 1$ und $x = 3$."
                }
            },
            {
                id: "d2_2",
                question: "Löse das LGS:\n$$\\begin{cases} a + b = 5 \\\\ 2a - b = 1 \\end{cases}$$\n\nFormat: `a; b`",
                answer: "2; 3",
                accepts: ["2; 3", "2;3", "a=2, b=3", "2, 3"],
                hints: [
                    "Addiere: $3a = 6 \\Rightarrow a = 2$.",
                    "$b = 5 - 2 = 3$."
                ],
                errorPatterns: {
                    "3; 2": "Vertauscht! $a = 2$, $b = 3$."
                }
            },
            {
                id: "d2_3",
                question: "Eine ganzrationale Funktion $f(x) = ax^2 + bx + c$ geht durch $P(0|3)$.\n\nWas folgt für die Koeffizienten?",
                answer: "c=3",
                accepts: ["c=3", "c = 3", "3"],
                hints: [
                    "$f(0) = a \\cdot 0 + b \\cdot 0 + c = c = 3$."
                ],
                errorPatterns: {
                    "a=3": "$f(0) = c$, nicht $a$."
                }
            },
            {
                id: "d2_4",
                question: "Eine Funktion hat bei $x = 2$ eine Nullstelle UND ein Extremum.\n\nWelche zwei Bedingungen ergeben sich?",
                type: "choice",
                options: [
                    "$f(2) = 0$ und $f'(2) = 0$",
                    "$f(2) = 0$ und $f''(2) = 0$",
                    "$f'(2) = 0$ und $f''(2) = 0$",
                    "$f(2) = 2$ und $f'(2) = 0$"
                ],
                correct: 0,
                hints: [
                    "Nullstelle: $f(2) = 0$. Extremum: $f'(2) = 0$."
                ]
            },
            {
                id: "d2_5",
                question: "Ist $f(x) = \\begin{cases} x^2 & x \\leq 1 \\\\ 2x - 1 & x > 1 \\end{cases}$ stetig bei $x = 1$?",
                type: "choice",
                options: [
                    "Ja — links $= 1$, rechts $= 1$, $f(1) = 1$",
                    "Nein — verschiedene Teilfunktionen",
                    "Nein — nicht differenzierbar",
                    "Kann man nicht entscheiden"
                ],
                correct: 0,
                hints: [
                    "$f(1) = 1$. $\\lim_{x \\to 1^-} x^2 = 1$. $\\lim_{x \\to 1^+} (2x-1) = 1$. ✓"
                ]
            },
            {
                id: "d2_6",
                question: "Was beschreibt das **Bestimmtheitsmaß** $R^2$?",
                type: "choice",
                options: [
                    "Die Steigung der Regressionsgerade",
                    "Den Anteil der Varianz, der durch das Modell erklärt wird",
                    "Die Anzahl der Datenpunkte",
                    "Den maximalen Fehler"
                ],
                correct: 1,
                hints: [
                    "$R^2 = 1$: perfekt. $R^2 = 0$: Modell erklärt nichts."
                ]
            },
            {
                id: "d2_7",
                question: "Löse (Rückwärtseinsetzen):\n$$\\begin{cases} a + b + c = 6 \\\\ b + 2c = 8 \\\\ c = 3 \\end{cases}$$\n\nFormat: `a; b; c`",
                answer: "1; 2; 3",
                accepts: ["1; 2; 3", "1;2;3", "1, 2, 3"],
                hints: [
                    "$c = 3$. $b = 8 - 6 = 2$. $a = 6 - 2 - 3 = 1$."
                ],
                errorPatterns: {
                    "3; 2; 1": "Reihenfolge: $a; b; c$ = $1; 2; 3$."
                }
            },
            {
                id: "d2_8",
                question: "Für $f(x) = ax^2 + bx + c$: Welche Bedingung liefert \"Steigung $5$ bei $x = 1$\"?",
                answer: "2a+b=5",
                accepts: ["2a+b=5", "2a + b = 5", "f'(1)=5"],
                hints: [
                    "$f'(x) = 2ax + b$. $f'(1) = 2a + b = 5$."
                ],
                errorPatterns: {
                    "a+b+c=5": "Das wäre $f(1) = 5$ (Funktionswert), nicht die Steigung!"
                }
            }
        ],
        masteryThreshold: 0.75
    },

    // --------------------------------------------------------
    // STECKBRIEFAUFGABEN (AS 6, Z1)
    // --------------------------------------------------------
    steckbrief: {
        title: "Steckbriefaufgaben",
        description: "Funktionen aus Bedingungen rekonstruieren — vom Sachproblem zum Modell.",
        explanation: `
            <h3>Steckbriefaufgaben — Vorgehen</h3>
            <ol style="margin-left:1.5rem; line-height:2.2;">
                <li><strong>Funktionstyp</strong> wählen: Grad $n$ → $n+1$ Koeffizienten → $n+1$ Bedingungen nötig</li>
                <li><strong>Bedingungen → Gleichungen:</strong>
                    <ul>
                        <li>Punkt $(x_0|y_0)$: $f(x_0) = y_0$</li>
                        <li>Extremum bei $x_0$: $f'(x_0) = 0$</li>
                        <li>Wendepunkt bei $x_0$: $f''(x_0) = 0$</li>
                        <li>Steigung $m$ bei $x_0$: $f'(x_0) = m$</li>
                    </ul>
                </li>
                <li><strong>LGS lösen</strong> (Gauß-Verfahren oder CAS)</li>
                <li><strong>Validieren:</strong> Erfüllt $f$ alle Bedingungen?</li>
            </ol>
        `,
        tasks: [
            {
                id: "sb1",
                question: "**Konturlinie (PhyTA):** Ein Werkstückprofil wird durch $f(x) = ax^2 + bx + c$ beschrieben.\n\nBedingungen:\n- $f(0) = 2$ (Startpunkt)\n- $f(4) = 10$ (Endpunkt)\n- $f'(4) = 0$ (waagerechter Auslauf)\n\nStelle das LGS auf und löse es.\n\nGib $a$, $b$, $c$ an (Format: `a; b; c`).",
                answer: "-1/2; 4; 2",
                accepts: ["-1/2; 4; 2", "-0.5; 4; 2", "-0,5; 4; 2", "a=-1/2, b=4, c=2", "-0.5;4;2"],
                hints: [
                    "$f(0) = c = 2$. $f(4) = 16a + 4b + 2 = 10 \\Rightarrow 16a + 4b = 8$.",
                    "$f'(x) = 2ax + b$. $f'(4) = 8a + b = 0$.",
                    "Aus $8a + b = 0$: $b = -8a$. In $16a + 4(-8a) = 8$: $-16a = 8 \\Rightarrow a = -\\frac{1}{2}$, $b = 4$."
                ],
                errorPatterns: {
                    "1/2; 4; 2": "Vorzeichen! $-16a = 8 \\Rightarrow a = -1/2$.",
                    "-1/2; -4; 2": "$b = -8a = -8 \\cdot (-1/2) = 4$, nicht $-4$."
                }
            },
            {
                id: "sb2",
                question: "**Übergangskurve (Straßenbau):** Zwei Fahrbahnabschnitte ($y = 0$ für $x \\leq 0$, $y = 1$ für $x \\geq 2$) sollen durch $f(x) = ax^3 + bx^2$ knickfrei verbunden werden.\n\nBedingungen: $f(0) = 0$, $f'(0) = 0$ (automatisch ✓), $f(2) = 1$, $f'(2) = 0$.\n\nLöse das LGS. Format: `a; b`",
                answer: "-1/4; 3/4",
                accepts: ["-1/4; 3/4", "-0.25; 0.75", "-0,25; 0,75", "a=-1/4, b=3/4"],
                hints: [
                    "$f(2) = 8a + 4b = 1$ und $f'(2) = 12a + 4b = 0$.",
                    "Differenz: $4a = -1 \\Rightarrow a = -1/4$.",
                    "$4b = -12a = 3 \\Rightarrow b = 3/4$."
                ],
                errorPatterns: {
                    "1/4; 3/4": "Vorzeichen! $4a = -1 \\Rightarrow a = -1/4$."
                }
            },
            {
                id: "sb3",
                question: "**Übergangskurve (Forts.):** Ist $f(x) = -\\frac{1}{4}x^3 + \\frac{3}{4}x^2$ an beiden Nahtstellen ($x=0$ und $x=2$) knickfrei?",
                type: "choice",
                options: [
                    "Ja — Funktionswert UND Ableitung stimmen an beiden Stellen überein",
                    "Nein — die Krümmung springt",
                    "Nur bei $x = 0$",
                    "Nur bei $x = 2$"
                ],
                correct: 0,
                hints: [
                    "$f(0) = 0 = y_\\text{links}$ ✓, $f'(0) = 0 = y'_\\text{links}$ ✓",
                    "$f(2) = 1 = y_\\text{rechts}$ ✓, $f'(2) = 0 = y'_\\text{rechts}$ ✓",
                    "Knickfrei ($C^1$-stetig). Für $C^2$ (auch Krümmung glatt) an zwei Übergängen braucht man i.d.R. 6 Bedingungen → Ansatz Grad 5."
                ]
            },
            {
                id: "sb4",
                question: "**Spannungs-Dehnungs-Diagramm (PhyTA):** Modell: $\\sigma(\\varepsilon) = a\\varepsilon^2 + b\\varepsilon$.\n\nBedingungen:\n- $\\sigma(0) = 0$ (automatisch ✓)\n- $\\sigma(2) = 400\\,\\text{MPa}$ (Zugfestigkeit bei $\\varepsilon = 2\\,\\%$)\n- $\\sigma'(2) = 0$ (Maximum)\n\nLöse nach $a$ und $b$. Format: `a; b`",
                answer: "-100; 400",
                accepts: ["-100; 400", "-100;400", "a=-100, b=400"],
                hints: [
                    "$\\sigma(2) = 4a + 2b = 400$ und $\\sigma'(2) = 4a + b = 0$.",
                    "Differenz: $b = 400$. Dann $4a = -400 \\Rightarrow a = -100$."
                ],
                errorPatterns: {
                    "100; 400": "Vorzeichen! $4a + b = 0 \\Rightarrow 4a = -400 \\Rightarrow a = -100$."
                }
            },
            {
                id: "sb5",
                question: "**Reaktortemperatur (PhyTA):** $T(t) = -2t^3 + 12t^2 + 20$ (°C, $t$ in Stunden).\n\nÜberprüfe: Welche der folgenden Eigenschaften hat dieses Modell?\n\n- $T(0) = 20$\n- Maximum bei $t = 4$\n- $T(6) = 20$ (zurück auf Startwert)\n- $T'(0) = 0$ (startet flach)",
                type: "choice",
                options: [
                    "Alle vier stimmen",
                    "Nur die ersten drei",
                    "Nur $T(0) = 20$ und $T(6) = 20$",
                    "Keine — das Modell ist falsch"
                ],
                correct: 0,
                hints: [
                    "$T(0) = 20$ ✓. $T'(t) = -6t^2 + 24t = -6t(t-4)$.",
                    "$T'(0) = 0$ ✓, $T'(4) = 0$ ✓ (Max).",
                    "$T(6) = -432 + 432 + 20 = 20$ ✓. Alle vier!"
                ]
            },
            {
                id: "sb6",
                question: "**Reaktortemperatur (Forts.):** Aus welchen **4 Bedingungen** wurde $T(t) = at^3 + bt^2 + ct + d$ bestimmt?\n\nKreuze an: Welche Bedingungen liefern die 4 Gleichungen?",
                type: "choice",
                options: [
                    "$T(0) = 20$, $T'(0) = 0$, $T'(4) = 0$, $T(6) = 20$",
                    "$T(0) = 20$, $T(4) = 84$, $T(6) = 20$, $T(8) = 0$",
                    "$T'(0) = 0$, $T'(4) = 0$, $T''(2) = 0$, $T(0) = 20$",
                    "$T(0) = 20$, $T(3) = 74$, $T(6) = 20$, $T(9) = -100$"
                ],
                correct: 0,
                hints: [
                    "4 Koeffizienten → 4 Bedingungen.",
                    "$T(0) = 20$ → $d = 20$. $T'(0) = 0$ → $c = 0$.",
                    "$T'(4) = 0$ und $T(6) = 20$ liefern die restlichen zwei Gleichungen für $a$ und $b$."
                ]
            },
            {
                id: "sb7",
                question: "**Höhenprofil (PhyTA):** Eine Brückenkontur wird durch $f(x) = ax^4 + bx^2 + c$ modelliert (symmetrisch!).\n\nBedingungen: $f(0) = 8$ (Scheitelpunkt), $f(5) = 0$ (Auflager), $f'(0) = 0$ (automatisch ✓ wegen Symmetrie).\n\nDas sind nur 2 Gleichungen für 3 Unbekannte. Was fehlt?",
                type: "choice",
                options: [
                    "Eine weitere Bedingung, z. B. die Krümmung am Scheitel oder ein weiterer Punkt",
                    "Nichts — 2 Gleichungen reichen für 3 Unbekannte",
                    "Man muss $a = 1$ setzen",
                    "Die Symmetrie liefert die fehlende Gleichung"
                ],
                correct: 0,
                hints: [
                    "3 Unbekannte brauchen 3 Gleichungen.",
                    "$f'(0) = 0$ ist automatisch erfüllt (nur gerade Potenzen) — zählt nicht extra!",
                    "Man braucht z. B. $f''(0) = -2$ (Krümmungsradius) oder $f(3) = 5$ (Zwischenpunkt)."
                ]
            },
            {
                id: "sb8",
                question: "**Zusammenfassung:** Bei einer Steckbriefaufgabe mit Polynom 3. Grades ($ax^3 + bx^2 + cx + d$) brauchst du genau...",
                type: "choice",
                options: [
                    "3 Bedingungen",
                    "4 Bedingungen",
                    "5 Bedingungen",
                    "Kommt auf die Aufgabe an"
                ],
                correct: 1,
                hints: [
                    "4 Koeffizienten → 4 Bedingungen.",
                    "Jede Bedingung (Punkt, Extremum, Wendepunkt, Steigung) liefert eine Gleichung."
                ]
            }
        ],
        masteryThreshold: 0.7
    },

    // --------------------------------------------------------
    // MODELLIERUNG + REGRESSION + MODELLKRITIK (AS 6, Z2–Z5)
    // --------------------------------------------------------
    modellierung: {
        title: "Modellieren & Optimieren",
        description: "Regression, Extremwertaufgaben und Modellkritik — mit Differentialrechnung Sachprobleme lösen.",
        explanation: `
            <h3>Modellierung mit Differentialrechnung</h3>
            <ul style="margin-left:1.5rem; line-height:2;">
                <li><strong>Regression:</strong> Messdaten → Funktionsgleichung → Prognose</li>
                <li><strong>Optimieren:</strong> Zielfunktion → $f'(x) = 0$ → Extremum</li>
                <li><strong>Bewerten:</strong> Ist das Modell gut ($R^2$)? Ist das Ergebnis realistisch?</li>
            </ul>
            <h4>Bestimmtheitsmaß $R^2$</h4>
            <p>$R^2 = 1$: perfekt. Faustregel (kontextabhängig!): $R^2 > 0{,}9$ oft gut, $R^2 > 0{,}95$ sehr gut.</p>
            <h4>Extremwertaufgaben</h4>
            <ol style="margin-left:1.5rem;">
                <li>Zielfunktion + Nebenbedingung</li>
                <li>NB einsetzen → eine Variable</li>
                <li>$f'(x) = 0$, Art prüfen</li>
                <li>Definitionsbereich + Plausibilität!</li>
            </ol>
        `,
        tasks: [
            {
                id: "reg1",
                question: "**Federgesetz (PhyTA):** Messdaten:\n\n| $m$ (kg) | 0,5 | 1,0 | 1,5 | 2,0 | 2,5 |\n|---|---|---|---|---|---|\n| $L$ (cm) | 12,4 | 14,9 | 17,3 | 19,8 | 22,4 |\n\nRegression: $L(m) = 4{,}98m + 9{,}92$, $R^2 = 0{,}9998$.\n\nIst das Modell gut?",
                type: "choice",
                options: [
                    "Nein, $R^2$ muss exakt 1 sein",
                    "Ja — $R^2 \\approx 1$ zeigt nahezu perfekte lineare Anpassung",
                    "Nein, zu wenig Datenpunkte",
                    "Kann man nicht beurteilen"
                ],
                correct: 1,
                hints: [
                    "$R^2 = 0{,}9998$: 99,98 % der Varianz erklärt. Hooke'sches Gesetz bestätigt!"
                ]
            },
            {
                id: "reg2",
                question: "**Feder (Forts.):** Federlänge ohne Belastung ($m = 0$)? (in cm)",
                answer: "9.92",
                accepts: ["9.92", "9,92", "9.92 cm"],
                hints: ["$L(0) = 9{,}92$ cm (Ruhelänge)."],
                errorPatterns: { "4.98": "Das ist die Steigung, nicht der Achsenabschnitt." }
            },
            {
                id: "reg3",
                question: "**Feder (Forts.):** Prognostiziere $L$ bei $m = 4$ kg. (in cm, 2 Dez.)",
                answer: "29.84",
                accepts: ["29.84", "29,84", "29.84 cm"],
                hints: ["$L(4) = 4{,}98 \\cdot 4 + 9{,}92 = 29{,}84$ cm. (Achtung: $m = 4$ liegt außerhalb der Messdaten — das ist Extrapolation!)"],
                errorPatterns: { "19.92": "$y$-Achsenabschnitt nicht vergessen!" }
            },
            {
                id: "reg4",
                question: "**Betondruckfestigkeit (PhyTA):** Zwei Regressionen:\n- Linear: $R^2 = 0{,}990$\n- Quadratisch: $R^2 = 0{,}999$\n\nDruckfestigkeit sinkt überproportional mit steigendem $w/z$-Wert.\n\nWelches Modell?",
                type: "choice",
                options: [
                    "Linear — einfacher",
                    "Quadratisch — $R^2$ höher",
                    "Quadratisch — $R^2$ höher UND physikalisch nichtlinearer Zusammenhang",
                    "Beide gleich gut"
                ],
                correct: 2,
                hints: ["Statistik ($R^2$) UND Physik sprechen für quadratisch."]
            },
            {
                id: "ext1",
                question: "**Verpackung:** Offene Schachtel, $V = 500\\,\\text{cm}^3$, quadratischer Boden ($a$), Höhe $h = 500/a^2$.\n\nOberfläche: $O(a) = a^2 + 2000/a$.\n\nOptimale Seitenlänge $a$? (in cm)",
                answer: "10",
                accepts: ["10", "a=10", "10 cm"],
                hints: [
                    "$O'(a) = 2a - 2000/a^2 = 0 \\Rightarrow a^3 = 1000 \\Rightarrow a = 10$."
                ],
                errorPatterns: {
                    "5": "Das ist $h = 500/100$, nicht $a$!",
                    "1000": "Dritte Wurzel! $a = \\sqrt[3]{1000} = 10$."
                }
            },
            {
                id: "ext2",
                question: "**Blechrinne (PhyTA):** $30$ cm Blech, U-Profil, Höhe $h$.\n$$A(h) = h(30-2h) = 30h - 2h^2$$\n\nOptimale Höhe? (in cm)",
                answer: "7.5",
                accepts: ["7.5", "7,5", "15/2"],
                hints: ["$A'(h) = 30 - 4h = 0 \\Rightarrow h = 7{,}5$."],
                errorPatterns: { "15": "Bei $h=15$ ist die Breite 0!" }
            },
            {
                id: "ext3",
                question: "**Leistungsanpassung (PhyTA):** $U_0 = 12$ V, $R_i = 4\\,\\Omega$.\n$$P(R) = \\frac{144R}{(R+4)^2}$$\n\nBei welchem $R$ ist $P$ maximal? Wie groß ist $P_{\\max}$?\n\nFormat: `R; P` (Ω; W)",
                answer: "4; 9",
                accepts: ["4; 9", "4;9", "R=4, P=9"],
                hints: [
                    "$P'(R) = \\frac{144(4-R)}{(R+4)^3} = 0 \\Rightarrow R = 4 = R_i$.",
                    "$P(4) = 576/64 = 9$ W. **Leistungsanpassung: $R = R_i$!**"
                ],
                errorPatterns: { "4; 36": "$(R+4)^2 = 64$, nicht $16$!" }
            },
            {
                id: "abschn1",
                question: "**CNC-Fräsbahn (PhyTA):**\n$$f(x) = \\begin{cases} x^2 & 0 \\leq x \\leq 2 \\\\ -x^2 + 8x - 8 & 2 < x \\leq 4 \\end{cases}$$\n\nIst $f$ **stetig** bei $x = 2$?",
                type: "choice",
                options: [
                    "Ja: links $= 4$, rechts $= 4$, $f(2) = 4$",
                    "Nein: links $= 4$, rechts $= 0$",
                    "Nein: links $= 2$, rechts $= 4$",
                    "Ja: $f(2) = 2$"
                ],
                correct: 0,
                hints: [
                    "$\\lim_{x \\to 2^-} x^2 = 4$. $\\lim_{x \\to 2^+} (-4+16-8) = 4$. $f(2) = 4$. ✓"
                ]
            },
            {
                id: "abschn2",
                question: "**CNC-Fräsbahn (Forts.):** Ist $f$ auch **differenzierbar** bei $x = 2$? (Knickfrei?)",
                type: "choice",
                options: [
                    "Ja: $f'(2^-) = 4$ und $f'(2^+) = 4$",
                    "Nein: $f'(2^-) = 4$ und $f'(2^+) = -4$",
                    "Nein: $f'(2^-) = 4$ und $f'(2^+) = 0$",
                    "Nein: $f'(2^-) = 2$ und $f'(2^+) = 4$"
                ],
                correct: 0,
                hints: [
                    "$f'_1(x) = 2x \\Rightarrow f'(2^-) = 4$. $f'_2(x) = -2x+8 \\Rightarrow f'(2^+) = 4$. Gleich → knickfrei ✓"
                ]
            },
            {
                id: "abschn3",
                question: "**Roboterarm (PhyTA):**\n$$v(t) = \\begin{cases} 3t^2 & 0 \\leq t \\leq 2 \\\\ 12 & t > 2 \\end{cases}$$\n\nStetig bei $t = 2$? Differenzierbar?",
                type: "choice",
                options: [
                    "Stetig und differenzierbar",
                    "Stetig, aber NICHT differenzierbar (Knick)",
                    "Nicht stetig",
                    "Differenzierbar, aber nicht stetig"
                ],
                correct: 1,
                hints: [
                    "Stetig: $v(2^-) = 12 = v(2^+)$ ✓.",
                    "Aber: $v'(2^-) = 12$, $v'(2^+) = 0$. Sprung → **Ruck!**"
                ]
            },
            {
                id: "krit1",
                question: "**Modellkritik:** $T(t) = -2t^3 + 18t^2 - 36t + 40$. Für $t = 10$: $T = -520°C$.\n\nWas sagt das über das Modell?",
                type: "choice",
                options: [
                    "Polynome divergieren — das Modell ist nur lokal gültig",
                    "Der Messfehler ist zu groß",
                    "Man muss den Betrag nehmen",
                    "Es wird halt sehr kalt"
                ],
                correct: 0,
                hints: [
                    "$-520°C$ liegt unter dem absoluten Nullpunkt!",
                    "Polynome → $\\pm\\infty$ für große $|t|$. **Nur lokal gültig!**"
                ]
            },
            {
                id: "krit2",
                question: "**Abkühlung:** Modell A: $T = -5t^2 + 80$ (Polynom). Modell B: $T = 80 e^{-0{,}1t}$ (Exponential).\n\nWelches ist physikalisch sinnvoller?",
                type: "choice",
                options: [
                    "A — einfacher",
                    "B — Exponentialmodell ist bei Abkühlung physikalisch plausibel (Newton) und $T > 0$ bleibt",
                    "Beide gleichwertig",
                    "A — Polynome sind genauer"
                ],
                correct: 1,
                hints: [
                    "A: $T(4) = 0$, $T(5) = -45$ — physikalischer Unsinn!",
                    "B: bleibt positiv, physikalisch fundiert (Newtonsches Abkühlungsgesetz)."
                ]
            },
            {
                id: "krit3",
                question: "**Extrapolation:** Daten für $0 \\leq t \\leq 5$, quadratische Regression $R^2 = 0{,}98$. Chef will Prognose für $t = 20$.\n\nDeine Reaktion?",
                type: "choice",
                options: [
                    "$R^2$ ist hoch → Prognose stimmt",
                    "Warnung: Extrapolation weit außerhalb ist riskant, auch bei gutem $R^2$",
                    "Ablehnen — $R^2 < 1$",
                    "Linear statt quadratisch extrapolieren"
                ],
                correct: 1,
                hints: [
                    "$R^2$ misst Güte **innerhalb** der Daten.",
                    "$t = 20$ ist 4× außerhalb → Polynom explodiert."
                ]
            }
        ],
        masteryThreshold: 0.7
    },

    // --------------------------------------------------------
    // KOMPLEXE MODELLIERUNG (AS 6, selbstständig)
    // --------------------------------------------------------
    extremwert: {
        title: "Komplexe Modellierung",
        description: "Eigenständig: Sachprobleme mathematisieren, optimieren, bewerten.",
        tasks: [
            {
                id: "kx1",
                question: "**Solarfeld (PhyTA):** $120$ m Zaun, eine Seite ist Hallenwand.\n\nMaximale Fläche? (in m²)",
                answer: "1800",
                accepts: ["1800", "1800 m²"],
                hints: [
                    "$a + 2b = 120$, $A(b) = (120-2b)b = 120b - 2b^2$.",
                    "$A'(b) = 120 - 4b = 0 \\Rightarrow b = 30$.",
                    "$A = 60 \\times 30 = 1800\\,\\text{m}^2$."
                ],
                errorPatterns: { "900": "$a \\neq b$! $a = 60$, $b = 30$." }
            },
            {
                id: "kx2",
                question: "**Stückkosten (PhyTA):**\n$$K(x) = x - 20 + \\frac{200}{x} \\quad (x > 0)$$\n\nOptimale Stückzahl (ganzzahlig!) und minimale Stückkosten.\n\nFormat: `x; K` (K auf 2 Dez. in €)",
                answer: "14; 8.29",
                accepts: ["14; 8.29", "14; 8,29", "14;8.29", "14;8,29"],
                hints: [
                    "$K'(x) = 1 - 200/x^2 = 0 \\Rightarrow x = \\sqrt{200} \\approx 14{,}1$.",
                    "$K(14) \\approx 8{,}29$, $K(15) \\approx 8{,}33$ → **14 Stück**."
                ],
                errorPatterns: { "14.14; 8.28": "Ganzzahlig produzieren! Vergleiche $K(14)$ und $K(15)$." }
            },
            {
                id: "kx3",
                question: "**Lagertank (PhyTA):** Zylinder, $V = 2\\,\\text{m}^3$.\n$$O(r) = 2\\pi r^2 + \\frac{4}{r}$$\n\nOptimaler Radius? (2 Dez., in m)",
                answer: "0.68",
                accepts: ["0.68", "0,68"],
                hints: [
                    "$O'(r) = 4\\pi r - 4/r^2 = 0 \\Rightarrow r^3 = 1/\\pi$.",
                    "$r = \\sqrt[3]{1/\\pi} \\approx 0{,}68$ m."
                ],
                errorPatterns: { "1.38": "Höhe, nicht Radius!" }
            },
            {
                id: "kx4",
                question: "**Gewinnmaximierung:** $x(p) = 200 - 4p$, Kosten $5€$/Stk + $100€$ fix.\n\nGewinnmaximaler Preis? (in €)",
                answer: "27.5",
                accepts: ["27.5", "27,5", "55/2"],
                hints: [
                    "$G(p) = -4p^2 + 220p - 1100$.",
                    "$G'(p) = -8p + 220 = 0 \\Rightarrow p = 27{,}5€$."
                ],
                errorPatterns: { "50": "Bei $p=50$ kauft niemand ($x=0$)!" }
            },
            {
                id: "kx5",
                question: "**Wärmedämmung (PhyTA):**\n$$K(d) = 15d + \\frac{6000}{d+2} \\quad (d > 0)$$\n\nOptimale Dämmstärke? (in cm)",
                answer: "18",
                accepts: ["18", "d=18", "18 cm"],
                hints: [
                    "$(d+2)^2 = 400 \\Rightarrow d = 18$."
                ],
                errorPatterns: { "20": "$(d+2) = 20 \\Rightarrow d = 18$!" }
            },
            {
                id: "kx6",
                question: "**Rohrleitung (PhyTA):** Von $A$ ($3$ km von Straße) nach $B$ ($5$ km Straße entlang). Quer: $8000$ €/km, Straße: $5000$ €/km.\n$$K(x) = 5000x + 8000\\sqrt{(5-x)^2 + 9}$$\n\nOptimale Abzweigung $x$? (2 Dez., in km)",
                answer: "2.60",
                accepts: ["2.60", "2,60", "2.6", "2,6"],
                hints: [
                    "$K'(x) = 5000 - \\frac{8000(5-x)}{\\sqrt{(5-x)^2+9}} = 0$.",
                    "$\\frac{5-x}{\\sqrt{(5-x)^2+9}} = \\frac{5}{8}$. Quadrieren → $(5-x)^2 \\cdot 64 = 25[(5-x)^2 + 9]$.",
                    "$39(5-x)^2 = 225 \\Rightarrow 5-x = \\frac{15}{\\sqrt{39}} \\approx 2{,}40 \\Rightarrow x \\approx 2{,}60$."
                ],
                errorPatterns: { "5": "Bei $x=5$ geht die ganze Strecke quer — teuer!" }
            },
            {
                id: "kx7",
                question: "**Modellwahl:** Temperaturverlauf ($0 \\leq t \\leq 8$h): Kubisch $R^2 = 0{,}97$, Exponentiell $R^2 = 0{,}93$.\n\nWelches für Prognose bei $t = 24$h?",
                type: "choice",
                options: [
                    "Kubisch — $R^2$ höher",
                    "Exponentiell — Polynome explodieren bei Extrapolation, Exponentialmodell ist bei Abkühlung physikalisch fundiert",
                    "Egal — $R^2$ entscheidet",
                    "Keines"
                ],
                correct: 1,
                hints: ["Extrapolation: **physikalische Plausibilität > $R^2$!**"]
            },
            {
                id: "kx8",
                question: "**Drei Gefahren** beim Modellieren mit ganzrationalen Funktionen?",
                type: "choice",
                options: [
                    "Zu viele Koeffizienten, zu langsam, zu ungenau",
                    "Extrapolation explodiert, Definitionsbereich ignoriert, Modell nicht geprüft",
                    "Nur linear, kein CAS nötig, zu einfach",
                    "Ableitungen zu schwer, LGS unlösbar, keine Extrema"
                ],
                correct: 1,
                hints: [
                    "1. Polynome → $\\pm\\infty$. 2. Physik-Grenzen werden nicht erzwungen. 3. $R^2$ gut ≠ Modell richtig."
                ]
            }
        ],
        masteryThreshold: 0.7
    },
    // --------------------------------------------------------
    // ABSCHLUSSTEST
    // --------------------------------------------------------
    final: {
        title: "Abschlusstest",
        description: "Zeig was du kannst! Ableitungsregeln + Extremwertaufgaben gemischt.",
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
                id: "f5",
                question: "Ein Betrieb produziert Gehäuse. Die Stückkosten sind:\n$$K(x) = x - 10 + \\frac{50}{x}$$\nBei welcher **ganzzahligen** Stückzahl sind die Kosten minimal?",
                answer: "7",
                accepts: ["7", "x=7", "7 Stück"],
                hints: [
                    "$K'(x) = 1 - \\frac{50}{x^2} = 0 \\Rightarrow x = \\sqrt{50} \\approx 7{,}07$",
                    "Ganzzahlig: $K(7) = 7 - 10 + 50/7 \\approx 4{,}14$, $K(8) = 8 - 10 + 50/8 = 4{,}25$ → **7 Stück**."
                ],
                errorPatterns: { "7.07": "Ganzzahlige Stückzahlen! Vergleiche $K(7)$ und $K(8)$.", "50": "Wurzel ziehen! $x = \\sqrt{50} \\approx 7{,}07$ → ganzzahlig: 7." }
            },
            {
                id: "f6",
                question: "Aus einem $20\\,\\text{cm}$ breiten Blech wird ein U-Kanal gebogen (Höhe $h$). Maximaler Querschnitt bei $h = \\,?$ cm.",
                answer: "5",
                accepts: ["5", "h=5", "5 cm"],
                hints: [
                    "$A(h) = h(20-2h)$, $A'(h) = 20-4h = 0$",
                    "$h = 5$, $A(5) = 50\\,\\text{cm}^2$"
                ],
                errorPatterns: { "10": "Bei $h=10$ ist die Breite 0! Definitionsbereich: $0 < h < 10$." }
            },
            {
                id: "f7", type: "choice",
                question: "Du berechnest, dass ein optimaler Behälter den Radius $r = 12\\,\\text{m}$ haben soll, aber er muss in eine $3\\,\\text{m}$ breite Halle passen.\n\nWas tust du?",
                options: [
                    "Ergebnis ist mathematisch korrekt, also $r = 12$ nehmen",
                    "Definitionsbereich anpassen: Maximum im Bereich $0 < r \\leq 1{,}5$ suchen (Randwertvergleich)",
                    "Aufgabe ist unlösbar",
                    "Einen größeren Raum suchen"
                ],
                correct: 1,
                hints: ["Das mathematische Optimum liegt außerhalb des zulässigen Bereichs. Was dann?"]
            }
        ],
        masteryThreshold: 0.8
    }
};

// Lernpfad-Reihenfolge
const UNIT_ORDER = ['diagnose', 'unit0', 'unit1', 'unit2', 'unit25', 'anwendungen1', 'diagnose2', 'steckbrief', 'modellierung', 'extremwert', 'final'];

// Gemini API (domain-restricted to hbraak.github.io)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
// Keys aus URL-Parametern
const _urlParams = new URLSearchParams(window.location.search);
const GEMINI_API_KEYS = [
    _urlParams.get('key') || '',
    _urlParams.get('key2') || '',
    _urlParams.get('key3') || ''
].filter(k => k.length > 0);
let _geminiKeyIndex = 0;
function getGeminiApiKey() {
    if (GEMINI_API_KEYS.length === 0) return '';
    return GEMINI_API_KEYS[_geminiKeyIndex % GEMINI_API_KEYS.length];
}
function rotateGeminiKey() {
    _geminiKeyIndex++;
    console.log('[Gemini] Rotated to key', (_geminiKeyIndex % GEMINI_API_KEYS.length) + 1);
}
const GEMINI_API_KEY = getGeminiApiKey();
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
