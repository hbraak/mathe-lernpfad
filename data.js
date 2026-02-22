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
    // DIAGNOSE 2: Vorwissen Extremwertaufgaben
    // Testet: Extremstellen bestimmen, Sachkontext → Formel,
    //         Nebenbedingung einsetzen, Ergebnis interpretieren
    // --------------------------------------------------------
    diagnose2: {
        title: "Diagnose: Optimierung",
        description: "Kannst du Extremstellen bestimmen und Sachprobleme mathematisch formulieren? Finde es heraus.",
        tasks: [
            {
                id: "d2_1",
                question: "Bestimme die Extremstellen von $f(x) = -2x^2 + 8x - 3$.\n\nGib den $x$-Wert an.",
                answer: "2",
                accepts: ["2", "x=2"],
                hints: [
                    "$f'(x) = -4x + 8$. Setze gleich Null.",
                    "$-4x + 8 = 0 \\Rightarrow x = 2$",
                    "$f''(2) = -4 < 0$ → Maximum bei $x = 2$."
                ],
                errorPatterns: {
                    "-2": "Vorzeichenfehler! $-4x + 8 = 0 \\Rightarrow x = 2$.",
                    "8": "Das ist ein Koeffizient, keine Nullstelle der Ableitung."
                }
            },
            {
                id: "d2_2",
                question: "Ein Rechteck hat den Umfang $U = 40\\,\\text{cm}$, Seiten $a$ und $b$.\n\nDrücke $b$ durch $a$ aus.",
                answer: "20-a",
                accepts: ["20-a", "b=20-a", "20 - a", "b = 20 - a"],
                hints: [
                    "Umfang: $2a + 2b = 40$",
                    "Teile durch 2: $a + b = 20$",
                    "Also $b = 20 - a$."
                ],
                errorPatterns: {
                    "40-a": "Du musst durch 2 teilen! $2a + 2b = 40 \\Rightarrow a + b = 20$.",
                    "40-2a": "Fast! Aber löse nach $b$ auf: $2b = 40 - 2a \\Rightarrow b = 20 - a$."
                }
            },
            {
                id: "d2_3",
                question: "Das Rechteck mit Umfang $40\\,\\text{cm}$ soll **maximale Fläche** haben.\n\nStelle die Flächenfunktion $A(a)$ auf. (Nutze $b = 20 - a$.)",
                answer: "a*(20-a)",
                accepts: ["a*(20-a)", "a(20-a)", "20a-a^2", "20a - a^2", "-a^2+20a", "a·(20-a)"],
                hints: [
                    "Fläche = Länge × Breite: $A = a \\cdot b$",
                    "Setze $b = 20 - a$ ein.",
                    "$A(a) = a \\cdot (20 - a) = 20a - a^2$"
                ],
                errorPatterns: {
                    "a*b": "Richtig, aber du musst $b$ eliminieren! Setze $b = 20-a$ ein.",
                    "2a*(20-a)": "Der Faktor 2 ist zu viel. $A = a \\cdot b$, nicht $2ab$."
                }
            },
            {
                id: "d2_4",
                question: "Für $A(a) = 20a - a^2$: Bei welchem $a$ ist die Fläche maximal?\n\n(Gib $a$ in cm an.)",
                answer: "10",
                accepts: ["10", "a=10", "10 cm"],
                hints: [
                    "$A'(a) = 20 - 2a$. Setze $A'(a) = 0$.",
                    "$20 - 2a = 0 \\Rightarrow a = 10$",
                    "$A''(10) = -2 < 0$ → Maximum. Die optimale Form ist ein Quadrat ($a = b = 10$)."
                ],
                errorPatterns: {
                    "20": "Das ist der halbe Umfang. Leite ab: $A'(a) = 20 - 2a = 0$.",
                    "100": "Das ist die maximale Fläche ($10 \\times 10$), nicht die Seitenlänge."
                }
            },
            {
                id: "d2_5",
                question: "Ein Bauer hat $60\\,\\text{m}$ Zaun. Er will an einer Hauswand ein rechteckiges Gehege bauen (Wand = eine Längsseite).\n\nWie lautet die Nebenbedingung für die Seitenlängen $a$ (parallel zur Wand) und $b$ (senkrecht)?",
                type: "choice",
                options: [
                    "$2a + 2b = 60$",
                    "$a + 2b = 60$",
                    "$a + b = 60$",
                    "$2a + b = 60$"
                ],
                correct: 1,
                hints: [
                    "Die Wand ersetzt eine Seite. Welche Seiten brauchen Zaun?",
                    "Eine Längsseite ($a$) + zwei Querseiten ($b$) = Gesamtzaun",
                    "$a + 2b = 60$ — die Wand spart eine komplette Seite $a$."
                ]
            },
            {
                id: "d2_6",
                question: "Eine Firma produziert $x$ Einheiten eines Bauteils. Der Gewinn ist:\n$$G(x) = -0{,}5x^2 + 40x - 200$$\n\nBei welcher Stückzahl ist der Gewinn maximal?",
                answer: "40",
                accepts: ["40", "x=40", "40 Stück"],
                hints: [
                    "$G'(x) = -x + 40$. Setze gleich Null.",
                    "$-x + 40 = 0 \\Rightarrow x = 40$",
                    "$G''(40) = -1 < 0$ → Maximum. $G(40) = -800 + 1600 - 200 = 600$."
                ],
                errorPatterns: {
                    "200": "Das ist die Fixkosten-Konstante, nicht die optimale Stückzahl.",
                    "600": "Das ist der maximale Gewinn, nicht die Stückzahl! Gefragt ist $x$."
                }
            },
            {
                id: "d2_7",
                question: "Ein Ball wird mit $v_0 = 20\\,\\frac{\\text{m}}{\\text{s}}$ senkrecht nach oben geworfen:\n$$h(t) = 20t - 5t^2$$\n\nNach wie vielen Sekunden erreicht er die maximale Höhe?",
                answer: "2",
                accepts: ["2", "t=2", "2 s", "2s"],
                hints: [
                    "$h'(t) = 20 - 10t$. Maximum: $h'(t) = 0$.",
                    "$20 - 10t = 0 \\Rightarrow t = 2\\,\\text{s}$",
                    "Die maximale Höhe ist $h(2) = 40 - 20 = 20\\,\\text{m}$."
                ],
                errorPatterns: {
                    "4": "Bei $t = 4$ ist $h = 0$ (Boden!). Das Maximum liegt bei $t = 2$.",
                    "20": "Das ist die maximale Höhe in Metern, nicht die Zeit."
                }
            },
            {
                id: "d2_8",
                question: "Bei einer Extremwertaufgabe hast du berechnet, dass eine Dose den optimalen Radius $r = -3\\,\\text{cm}$ hat.\n\nWas schließt du daraus?",
                type: "choice",
                options: [
                    "Die Dose hat negative Krümmung",
                    "Das Ergebnis ist physikalisch unsinnig — Rechenfehler oder falscher Definitionsbereich",
                    "Man muss den Betrag nehmen: $r = 3\\,\\text{cm}$",
                    "Negative Radien sind bei Hohlkörpern zulässig"
                ],
                correct: 1,
                hints: [
                    "Kann ein Radius negativ sein?",
                    "Nein! $r > 0$ ist eine natürliche Einschränkung (Definitionsbereich).",
                    "Ein negatives Ergebnis bedeutet: Rechenfehler suchen oder Definitionsbereich prüfen. **Ergebnisse immer im Sachkontext bewerten!**"
                ]
            }
        ],
        masteryThreshold: 0.75
    },

    // --------------------------------------------------------
    // MODELLIERUNG: Geführte Extremwertaufgaben
    // Kern von AS 6: Sachproblem → Modell → Lösung → Bewertung
    // Scaffolding: Schritt für Schritt zum Modell
    // --------------------------------------------------------
    modellierung: {
        title: "Modellieren lernen",
        description: "Vom Sachproblem zur Zielfunktion — Schritt für Schritt.",
        explanation: `
            <h3>Schema für Extremwertaufgaben</h3>
            <ol style="margin-left:1.5rem; line-height:2.2;">
                <li><strong>Verstehen:</strong> Was soll optimiert werden? (→ Zielfunktion)</li>
                <li><strong>Skizzieren:</strong> Bild anfertigen, Variablen einführen</li>
                <li><strong>Nebenbedingung</strong> (NB): Welche Einschränkung gilt?</li>
                <li><strong>Einsetzen:</strong> NB in Zielfunktion → Funktion mit <em>einer</em> Variablen</li>
                <li><strong>Optimieren:</strong> $f'(x) = 0$, Art des Extremums prüfen</li>
                <li><strong>Definitionsbereich</strong> beachten + Randwerte prüfen</li>
                <li><strong>Antwort</strong> im Sachkontext, Einheiten, Plausibilität</li>
            </ol>
            <div style="margin-top:1rem; padding:0.8rem; background:#fff3cd; border-radius:8px;">
                <strong>⚠️ Häufige Fehler:</strong> NB vergessen, Definitionsbereich ignoriert, Einheiten vergessen, Ergebnis nicht im Kontext interpretiert.
            </div>
        `,
        tasks: [
            // --- Block A: Verpackungsoptimierung (3 Aufgaben, geführt) ---
            {
                id: "mod1",
                question: "**Verpackung:** Eine offene Schachtel (ohne Deckel) soll $V = 500\\,\\text{cm}^3$ fassen. Der Boden ist quadratisch (Seite $a$), die Höhe ist $h$.\n\n**Schritt 1:** Stelle die Nebenbedingung auf — drücke $h$ durch $a$ aus.",
                answer: "500/a^2",
                accepts: ["500/a^2", "h=500/a^2", "500/a²", "h = 500/a^2", "500/(a^2)"],
                hints: [
                    "Volumen eines Quaders: $V = \\text{Grundfläche} \\times \\text{Höhe}$",
                    "$V = a^2 \\cdot h = 500$",
                    "Umstellen: $h = \\frac{500}{a^2}$"
                ],
                errorPatterns: {
                    "500/a": "Die Grundfläche ist quadratisch: $a \\cdot a = a^2$, nicht $a$!",
                    "500/(2a)": "Die Grundfläche ist $a^2$ (Quadrat), nicht $2a$."
                }
            },
            {
                id: "mod2",
                question: "**Verpackung (Forts.):** Die Oberfläche (Boden + 4 Seiten, kein Deckel) soll **minimal** sein.\n\n**Schritt 2:** Stelle $O(a)$ auf. (Nutze $h = \\frac{500}{a^2}$.)",
                answer: "a^2+2000/a",
                accepts: ["a^2+2000/a", "a^2 + 2000/a", "a² + 2000/a", "O=a^2+2000/a"],
                hints: [
                    "Oberfläche = Boden + 4 Seitenflächen: $O = a^2 + 4 \\cdot a \\cdot h$",
                    "Einsetzen: $O(a) = a^2 + 4a \\cdot \\frac{500}{a^2}$",
                    "Vereinfachen: $O(a) = a^2 + \\frac{2000}{a}$"
                ],
                errorPatterns: {
                    "2a^2+2000/a": "Die Schachtel hat keinen Deckel! Boden = $a^2$ (einmal), nicht $2a^2$.",
                    "a^2+500/a": "$4 \\cdot a \\cdot \\frac{500}{a^2} = \\frac{2000}{a}$, nicht $\\frac{500}{a}$."
                }
            },
            {
                id: "mod3",
                question: "**Verpackung (Forts.):** Für $O(a) = a^2 + \\frac{2000}{a}$:\n\n**Schritt 3:** Berechne die optimale Seitenlänge $a$ (in cm).",
                answer: "10.0",
                accepts: ["10.0", "10", "10,0", "a=10", "10 cm"],
                hints: [
                    "$O'(a) = 2a - \\frac{2000}{a^2}$. Setze $O'(a) = 0$.",
                    "$2a = \\frac{2000}{a^2} \\Rightarrow 2a^3 = 2000 \\Rightarrow a^3 = 1000$",
                    "$a = \\sqrt[3]{1000} = 10\\,\\text{cm}$. Dann $h = \\frac{500}{100} = 5\\,\\text{cm}$."
                ],
                errorPatterns: {
                    "5": "Das ist die Höhe $h$, nicht die Seitenlänge $a$!",
                    "1000": "Du musst die dritte Wurzel ziehen: $a = \\sqrt[3]{1000} = 10$."
                }
            },
            // --- Block B: Rinne (Blechbearbeitung — PhyTA) ---
            {
                id: "mod4",
                question: "**Blechrinne (PhyTA):** Aus einem $30\\,\\text{cm}$ breiten Blech werden die Ränder um die Höhe $h$ nach oben gebogen → U-Profil.\n\nDie Rinnenbreite ist $b = 30 - 2h$.\n\n**Zielfunktion:** Der Querschnitt $A(h) = h \\cdot b$ soll maximal sein. Stelle $A(h)$ auf.",
                answer: "h*(30-2h)",
                accepts: ["h*(30-2h)", "h(30-2h)", "30h-2h^2", "30h - 2h^2", "-2h^2+30h"],
                hints: [
                    "Querschnitt = Höhe × Breite: $A = h \\cdot b$",
                    "Setze $b = 30 - 2h$ ein.",
                    "$A(h) = h(30 - 2h) = 30h - 2h^2$"
                ],
                errorPatterns: {
                    "h*(30-h)": "Beide Seiten werden hochgebogen: $b = 30 - 2h$, nicht $30 - h$!",
                    "30h-h^2": "Vorfaktor beachten: $h \\cdot (-2h) = -2h^2$."
                }
            },
            {
                id: "mod5",
                question: "**Blechrinne (Forts.):** Für $A(h) = 30h - 2h^2$:\n\nBei welcher Höhe $h$ ist der Querschnitt maximal? (in cm)",
                answer: "7.5",
                accepts: ["7.5", "7,5", "h=7.5", "h=7,5", "7.5 cm", "15/2", "7,5 cm"],
                hints: [
                    "$A'(h) = 30 - 4h = 0 \\Rightarrow h = 7{,}5\\,\\text{cm}$",
                    "Definitionsbereich: $h > 0$ und $b = 30 - 2h > 0$, also $0 < h < 15$.",
                    "$h = 7{,}5$ liegt im Definitionsbereich $0 < h < 15$ ✓. Querschnitt: $A(7{,}5) = 112{,}5\\,\\text{cm}^2$."
                ],
                errorPatterns: {
                    "15": "Bei $h = 15$ ist $b = 0$ — kein Querschnitt! Das ist der Rand des Definitionsbereichs.",
                    "3.75": "Rechenfehler: $30 - 4h = 0 \\Rightarrow h = 7{,}5$, nicht $3{,}75$."
                }
            },
            // --- Block C: Kostenoptimierung (PhyTA — Produktion) ---
            {
                id: "mod6",
                question: "**Produktionskosten (PhyTA):** Eine Werkstatt produziert $x$ Bauteile pro Tag. Die Stückkosten betragen:\n$$K(x) = \\frac{x^2 - 20x + 200}{x} = x - 20 + \\frac{200}{x}$$\n\n(in € pro Stück, für $x > 0$)\n\nBei welcher Tagesproduktion sind die **Stückkosten minimal**?",
                answer: "sqrt(200)",
                accepts: ["sqrt(200)", "√200", "10*sqrt(2)", "10√2", "14.14", "14,14", "14.1", "14,1"],
                hints: [
                    "$K'(x) = 1 - \\frac{200}{x^2}$. Setze $K'(x) = 0$.",
                    "$1 = \\frac{200}{x^2} \\Rightarrow x^2 = 200$",
                    "$x = \\sqrt{200} = 10\\sqrt{2} \\approx 14{,}1$ Bauteile. $K''(x) = \\frac{400}{x^3} > 0$ → Minimum ✓"
                ],
                errorPatterns: {
                    "200": "Du musst die Wurzel ziehen! $x^2 = 200 \\Rightarrow x = \\sqrt{200}$.",
                    "10": "$10^2 = 100 \\neq 200$. Rechne nochmal: $x = \\sqrt{200} \\approx 14{,}1$.",
                    "20": "Das ist aus $-20$ im Term, nicht aus der Ableitung."
                }
            },
            {
                id: "mod7",
                question: "**Produktionskosten (Forts.):** Die minimalen Stückkosten bei $x \\approx 14{,}1$.\n\nAber: Man kann nur **ganzzahlige** Stückzahlen produzieren. Vergleiche $K(14)$ und $K(15)$.\n\nWelche Stückzahl ist günstiger?",
                answer: "14",
                accepts: ["14", "x=14", "14 Stück"],
                hints: [
                    "$K(14) = 14 - 20 + \\frac{200}{14} = 14 - 20 + 14{,}29 \\approx 8{,}29\\,€$",
                    "$K(15) = 15 - 20 + \\frac{200}{15} = 15 - 20 + 13{,}33 \\approx 8{,}33\\,€$",
                    "$K(14) \\approx 8{,}29 < K(15) \\approx 8{,}33$ → **14 Stück** ist minimal."
                ],
                errorPatterns: {
                    "15": "Nachrechnen! $K(14) \\approx 8{,}29 < K(15) \\approx 8{,}33$. 14 ist besser."
                }
            },
            // --- Block D: Behälterdesign (komplexer, technisch) ---
            {
                id: "mod8",
                question: "**Lagertank (PhyTA):** Ein zylindrischer Tank soll $V = 2000\\,\\text{Liter} = 2\\,\\text{m}^3$ fassen. Die Herstellungskosten hängen von der Oberfläche ab:\n$$O(r) = 2\\pi r^2 + \\frac{2V}{r} = 2\\pi r^2 + \\frac{4}{r}$$\n\nBerechne den optimalen Radius $r$ für minimale Kosten.\n\n(Auf 2 Dezimalen, in m.)",
                answer: "0.68",
                accepts: ["0.68", "0,68", "r=0.68", "r=0,68", "0.683", "0,683"],
                hints: [
                    "$O'(r) = 4\\pi r - \\frac{4}{r^2}$. Setze $O'(r) = 0$.",
                    "$4\\pi r = \\frac{4}{r^2} \\Rightarrow r^3 = \\frac{1}{\\pi}$",
                    "$r = \\sqrt[3]{\\frac{1}{\\pi}} \\approx 0{,}68\\,\\text{m}$. Höhe: $h = \\frac{2}{\\pi \\cdot 0{,}68^2} \\approx 1{,}38\\,\\text{m}$."
                ],
                errorPatterns: {
                    "0.32": "Hast du $r^3 = \\pi$ statt $r^3 = \\frac{1}{\\pi}$ gerechnet? Richtig: $4\\pi r = \\frac{4}{r^2}$.",
                    "1.38": "Das ist die Höhe $h$, nicht der Radius!"
                }
            },
            // --- Block E: Modellierung aus Text (weniger Scaffolding) ---
            {
                id: "mod9",
                question: "**Solarfeld (PhyTA):** Ein rechteckiges Solarfeld wird mit $120\\,\\text{m}$ Zaun eingezäunt. Auf einer Seite steht bereits eine Hallenwand.\n\nStelle die Flächenfunktion $A(b)$ auf, wobei $b$ die Seite senkrecht zur Wand ist.\n\n(Tipp: Überlege zuerst die Nebenbedingung.)",
                answer: "b*(120-2b)",
                accepts: ["b*(120-2b)", "b(120-2b)", "120b-2b^2", "120b - 2b^2", "-2b^2+120b"],
                hints: [
                    "Nebenbedingung: Eine Seite $a$ (parallel zur Wand) + zwei Seiten $b$ = $120\\,\\text{m}$.",
                    "Also $a = 120 - 2b$.",
                    "$A(b) = a \\cdot b = (120 - 2b) \\cdot b = 120b - 2b^2$"
                ],
                errorPatterns: {
                    "b*(120-b)": "Beide Querseiten brauchen Zaun: $a + 2b = 120$, nicht $a + b = 120$!",
                    "b*(60-b)": "Der Umfang ist nicht $2a + 2b = 120$! Eine Seite fehlt (Wand): $a + 2b = 120$."
                }
            },
            {
                id: "mod10",
                question: "**Solarfeld (Forts.):** Berechne die maximale Fläche des Solarfeldes.\n\n(Gib die Fläche in m² an.)",
                answer: "1800",
                accepts: ["1800", "1800 m²", "1800m²", "A=1800"],
                hints: [
                    "$A(b) = 120b - 2b^2$. Ableiten: $A'(b) = 120 - 4b = 0$.",
                    "$b = 30\\,\\text{m}$, also $a = 120 - 60 = 60\\,\\text{m}$.",
                    "$A_{\\max} = 60 \\cdot 30 = 1800\\,\\text{m}^2$"
                ],
                errorPatterns: {
                    "30": "Das ist $b$, nicht die Fläche! $A = 60 \\cdot 30 = 1800\\,\\text{m}^2$.",
                    "60": "Das ist $a$. Fläche $= a \\cdot b = 60 \\cdot 30 = 1800$.",
                    "900": "Das wäre $30^2$. Aber $a \\neq b$! $A = 60 \\cdot 30 = 1800$."
                }
            },
            // --- Block F: Gewinnmaximierung ---
            {
                id: "mod11",
                question: "**Preisoptimierung (PhyTA):** Ein Betrieb verkauft Sensoren. Bei Preis $p$ (in €) ist die Nachfrage:\n$$x(p) = 200 - 4p$$\nDie Produktionskosten betragen $5\\,€$ pro Stück (+ $100\\,€$ Fixkosten).\n\nStelle die Gewinnfunktion $G(p)$ auf.\n\n(Gewinn = Erlös − Kosten, Erlös = $p \\cdot x$)",
                answer: "(p-5)*(200-4p)-100",
                accepts: [
                    "(p-5)*(200-4p)-100", "-4p^2+220p-1100",
                    "-4p^2 + 220p - 1100", "p*(200-4p)-5*(200-4p)-100",
                    "(200-4p)*(p-5)-100", "200p-4p^2-1000+20p-100"
                ],
                hints: [
                    "Erlös: $E(p) = p \\cdot x(p) = p(200 - 4p)$",
                    "Kosten: $K(x) = 5x + 100 = 5(200 - 4p) + 100 = 1100 - 20p$",
                    "$G(p) = E - K = 200p - 4p^2 - 1100 + 20p = -4p^2 + 220p - 1100$"
                ],
                errorPatterns: {
                    "p*(200-4p)": "Das ist nur der Erlös! Kosten abziehen: $G = E - K$.",
                    "200p-4p^2-100": "Du hast die variablen Kosten ($5$ € pro Stück) vergessen!"
                }
            },
            {
                id: "mod12",
                question: "**Preisoptimierung (Forts.):** Für $G(p) = -4p^2 + 220p - 1100$:\n\nBerechne den gewinnmaximalen Preis.\n\n(Gib $p$ in € an.)",
                answer: "27.5",
                accepts: ["27.5", "27,5", "p=27.5", "p=27,5", "27.50", "27,50", "55/2"],
                hints: [
                    "$G'(p) = -8p + 220 = 0$",
                    "$p = \\frac{220}{8} = 27{,}5\\,€$",
                    "$G(27{,}5) = -4 \\cdot 756{,}25 + 6050 - 1100 = -3025 + 6050 - 1100 = 1925\\,€$"
                ],
                errorPatterns: {
                    "50": "Bei $p = 50$ ist $x = 0$ — niemand kauft! Leite $G'(p)$ ab.",
                    "55": "$G'(p) = -8p + 220 = 0 \\Rightarrow p = 27{,}5$, nicht $55$."
                }
            }
        ],
        masteryThreshold: 0.7
    },

    // --------------------------------------------------------
    // EXTREMWERTAUFGABEN: Selbstständig modellieren & optimieren
    // Weniger Scaffolding, komplexere Kontexte
    // --------------------------------------------------------
    extremwert: {
        title: "Extremwertaufgaben",
        description: "Jetzt komplett selbstständig: Sachproblem analysieren, Modell aufstellen, optimieren, bewerten.",
        explanation: `
            <h3>Erinnerung: Vorgehen</h3>
            <ol style="margin-left:1.5rem; line-height:2.2;">
                <li><strong>Was</strong> soll optimiert werden? → Zielfunktion</li>
                <li><strong>Welche Einschränkung</strong> gilt? → Nebenbedingung</li>
                <li>NB einsetzen → Funktion mit <strong>einer</strong> Variablen</li>
                <li>Ableiten, Nullstellen, Art prüfen</li>
                <li><strong>Definitionsbereich + Einheiten + Plausibilität!</strong></li>
            </ol>
        `,
        tasks: [
            {
                id: "ew1",
                question: "**Kabelkanal (PhyTA):** Ein Kabelkanal mit U-Profil wird aus einem $24\\,\\text{cm}$ breiten Alublech gebogen. Die Biegehöhe ist $h$, die Kanalbreite $24 - 2h$.\n\nBerechne $h$ für maximalen Kabelquerschnitt und gib die **maximale Querschnittsfläche** an.\n\n(Gib $h$ in cm und $A_{\\max}$ in cm² an, Format: `h; A`)",
                answer: "6; 72",
                accepts: ["6; 72", "6;72", "h=6, A=72", "6, 72", "h=6; A=72"],
                hints: [
                    "$A(h) = h \\cdot (24 - 2h) = 24h - 2h^2$",
                    "$A'(h) = 24 - 4h = 0 \\Rightarrow h = 6\\,\\text{cm}$",
                    "$A(6) = 6 \\cdot 12 = 72\\,\\text{cm}^2$. Definitionsbereich: $0 < h < 12$ ✓"
                ],
                errorPatterns: {
                    "12; 0": "Bei $h = 12$ ist die Breite $0$! $h = 12$ ist der Rand, nicht das Maximum.",
                    "6; 36": "Breite = $24 - 2 \\cdot 6 = 12$, nicht $6$! $A = 6 \\cdot 12 = 72$."
                }
            },
            {
                id: "ew2",
                question: "**Leistungsanpassung (PhyTA):** Eine Spannungsquelle ($U_0 = 12\\,\\text{V}$, Innenwiderstand $R_i = 4\\,\\Omega$) speist einen Lastwiderstand $R$.\n\nDie Leistung am Lastwiderstand ist:\n$$P(R) = \\frac{U_0^2 \\cdot R}{(R + R_i)^2} = \\frac{144R}{(R+4)^2}$$\n\nBei welchem $R$ ist $P$ maximal? (in $\\Omega$)\n\nUnd: Wie groß ist $P_{\\max}$? (in W)\n\n(Format: `R; P`)",
                answer: "4; 9",
                accepts: ["4; 9", "4;9", "R=4, P=9", "4, 9", "R=Ri; 9", "R=4; P=9"],
                hints: [
                    "Quotientenregel oder: $P(R) = 144R(R+4)^{-2}$, Produktregel.",
                    "$P'(R) = \\frac{144(4-R)}{(R+4)^3}$. Also $P'(R) = 0 \\Rightarrow R = 4 = R_i$.",
                    "**Leistungsanpassung:** $R = R_i$ → maximale Leistung! $P(4) = \\frac{144 \\cdot 4}{64} = 9\\,\\text{W}$."
                ],
                errorPatterns: {
                    "0; 0": "Bei $R = 0$ (Kurzschluss) fließt zwar max. Strom, aber alle Leistung geht in $R_i$ verloren!",
                    "4; 36": "$P(4) = \\frac{576}{64} = 9\\,\\text{W}$, nicht $36$."
                }
            },
            {
                id: "ew3",
                question: "**Fenster:** Ein gotisches Fenster besteht aus einem Rechteck (Breite $2r$, Höhe $h$) mit aufgesetztem Halbkreis (Radius $r$). Der Umfang beträgt $U = 6\\,\\text{m}$.\n\nDrücke $h$ durch $r$ aus.\n\n(Umfang = untere Kante + 2 Seiten + Halbkreisbogen)",
                answer: "3-r-pi*r/2",
                accepts: [
                    "3-r-pi*r/2", "3 - r - πr/2", "(6-2r-pi*r)/2", "3-r(1+pi/2)",
                    "3-r-0.5*pi*r", "h=3-r-pi*r/2"
                ],
                hints: [
                    "Umfang: Unten ($2r$) + 2 Seiten ($2h$) + Halbkreis ($\\pi r$) = $6$",
                    "$2r + 2h + \\pi r = 6$",
                    "$2h = 6 - 2r - \\pi r \\Rightarrow h = 3 - r - \\frac{\\pi r}{2}$"
                ],
                errorPatterns: {
                    "3-r-pi*r": "Du hast $\\pi r$ nicht durch 2 geteilt! Aus $2h = 6 - 2r - \\pi r$ folgt $h = 3 - r - \\frac{\\pi r}{2}$.",
                    "3-r": "Du hast den Halbkreisbogen vergessen!"
                }
            },
            {
                id: "ew4",
                question: "**Rohrleitung (PhyTA):** Eine Rohrleitung soll von Punkt $A$ zu Punkt $B$ verlegt werden. $A$ liegt $3\\,\\text{km}$ von einer Straße entfernt (senkrecht), $B$ liegt $5\\,\\text{km}$ entlang der Straße.\n\nKosten: Querfeld $8000\\,€/\\text{km}$, Straße $5000\\,€/\\text{km}$.\n\nDie Leitung geht $x\\,\\text{km}$ entlang der Straße, dann quer zum Punkt $A$.\n\nStelle die Kostenfunktion $K(x)$ auf.\n\n(Querfeldstrecke mit Pythagoras.)",
                answer: "5000x+8000*sqrt(9+(5-x)^2)",
                accepts: [
                    "5000x+8000*sqrt(9+(5-x)^2)",
                    "5000x + 8000*sqrt((5-x)^2+9)",
                    "5000x+8000*sqrt((5-x)^2+3^2)",
                    "5000x+8000√(9+(5-x)²)"
                ],
                hints: [
                    "Von $B$ aus: $x$ km Straße (Kosten: $5000x$), dann quer.",
                    "Die Querfeldstrecke: Horizontale Distanz $= 5 - x$, Vertikale $= 3$.",
                    "Pythagoras: $d = \\sqrt{(5-x)^2 + 9}$. Kosten quer: $8000\\sqrt{(5-x)^2 + 9}$.\n\n$K(x) = 5000x + 8000\\sqrt{(5-x)^2 + 9}$"
                ],
                errorPatterns: {
                    "5000x+8000*sqrt(9+x^2)": "Die Querfeldstrecke geht von der Abzweigung zu $A$. Horizontale Distanz = $5 - x$, nicht $x$!",
                    "5000x+8000*sqrt(25+9)": "Die horizontale Distanz hängt von $x$ ab: $5 - x$, nicht konstant 5!"
                }
            },
            {
                id: "ew5",
                question: "**Dose (klassisch):** Eine geschlossene zylindrische Dose soll $V = 330\\,\\text{cm}^3$ (wie eine Getränkedose) fassen.\n\nDie Oberfläche soll minimal sein: $O(r) = 2\\pi r^2 + \\frac{660}{r}$.\n\nBerechne den optimalen Radius $r$.\n\n(Auf 2 Dezimalen, in cm.)",
                answer: "3.74",
                accepts: ["3.74", "3,74", "r=3.74", "r=3,74", "3.7", "3,7"],
                hints: [
                    "$O'(r) = 4\\pi r - \\frac{660}{r^2} = 0$",
                    "$4\\pi r^3 = 660 \\Rightarrow r^3 = \\frac{660}{4\\pi} = \\frac{165}{\\pi}$",
                    "$r = \\sqrt[3]{\\frac{165}{\\pi}} \\approx 3{,}74\\,\\text{cm}$"
                ],
                errorPatterns: {
                    "3.3": "Eine echte Getränkedose hat $r \\approx 3{,}3$ cm, ist aber NICHT optimal (Marketing!).",
                    "52.5": "Das ist $\\frac{165}{\\pi}$ — du musst noch die dritte Wurzel ziehen!"
                }
            },
            {
                id: "ew6",
                question: "**Dose (Reflexion):** Der berechnete optimale Radius ist $r \\approx 3{,}74\\,\\text{cm}$, eine echte 330-ml-Dose hat $r \\approx 3{,}3\\,\\text{cm}$.\n\nWarum weichen reale Dosen vom mathematischen Optimum ab?",
                type: "choice",
                options: [
                    "Die Mathematik ist falsch",
                    "Reale Dosen müssen ins Regal passen, stapelbar sein, und die Griffergonomie spielt eine Rolle",
                    "Aluminium ist zu teuer für optimale Formen",
                    "Zylindrische Dosen sind grundsätzlich nicht optimal"
                ],
                correct: 1,
                hints: [
                    "Das Modell minimiert nur die Oberfläche. Was berücksichtigt es nicht?",
                    "Ergonomie (Griffgröße), Regale, Stapelbarkeit, Transporteffizienz...",
                    "Das mathematische Modell ist eine **Vereinfachung** der Realität. Reale Entscheidungen berücksichtigen viele Faktoren, die im Modell fehlen."
                ]
            },
            {
                id: "ew7",
                question: "**Abwasserkanal (PhyTA):** Ein trapezförmiger Kanal hat die Bodenbreite $b = 2\\,\\text{m}$. Die schrägen Seitenwände haben die Länge $s$ und den Neigungswinkel $60°$.\n\nDie Querschnittsfläche des Trapezes ist:\n$$A(s) = 2s + \\frac{\\sqrt{3}}{2} s^2$$\n\nBei welcher Seitenlänge $s$ pro laufendem Meter Kanal ist $A$ maximal sinnlos — die Fläche wächst unbegrenzt!\n\nWas ist das **eigentliche** Optimierungsproblem bei einem Kanal?",
                type: "choice",
                options: [
                    "Maximale Fläche bei festem Umfang",
                    "Minimaler Umfang (= Materialverbrauch) bei festem Querschnitt",
                    "Maximale Tiefe bei festem Volumen",
                    "Minimale Fläche bei festem Gewicht"
                ],
                correct: 1,
                hints: [
                    "Mehr Seitenwand = mehr Material = teurer. Was ist begrenzt?",
                    "Man will einen bestimmten Durchfluss (= Querschnitt) und möglichst wenig Material.",
                    "**Minimaler Umfang bei festem Querschnitt** — die Zielfunktion ist der Umfang (= Materialverbrauch), die Nebenbedingung ist die geforderte Querschnittsfläche."
                ]
            },
            {
                id: "ew8",
                question: "**Wärmedämmung (PhyTA):** Eine Wand (Fläche $A = 20\\,\\text{m}^2$) soll mit $d\\,\\text{cm}$ Dämmung versehen werden. Die Gesamtkosten sind:\n$$K(d) = 15d + \\frac{6000}{d+2}$$\n(Dämmkosten + Heizkosten über 20 Jahre, in €)\n\nBerechne die optimale Dämmstärke $d$.\n\n(Auf 1 Dezimale, in cm.)",
                answer: "18.0",
                accepts: ["18.0", "18", "18,0", "d=18", "d=18.0", "18 cm", "18cm", "d=18 cm"],
                hints: [
                    "$K'(d) = 15 - \\frac{6000}{(d+2)^2} = 0$",
                    "$15(d+2)^2 = 6000 \\Rightarrow (d+2)^2 = 400$",
                    "$(d+2) = 20 \\Rightarrow d = 18\\,\\text{cm}$. ($d = -22$ entfällt, da $d > 0$.)"
                ],
                errorPatterns: {
                    "20": "$(d+2) = 20$, also $d = 18$, nicht $20$!",
                    "-22": "Negative Dämmstärke? Definitionsbereich: $d > 0$!"
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
                question: "Ein Betrieb produziert Gehäuse. Die Stückkosten sind:\n$$K(x) = x - 10 + \\frac{50}{x}$$\nBei welcher Stückzahl $x$ sind die Kosten minimal?",
                answer: "sqrt(50)",
                accepts: ["sqrt(50)", "√50", "5*sqrt(2)", "5√2", "7.07", "7,07"],
                hints: [
                    "$K'(x) = 1 - \\frac{50}{x^2} = 0$",
                    "$x^2 = 50 \\Rightarrow x = \\sqrt{50} = 5\\sqrt{2} \\approx 7{,}07$"
                ],
                errorPatterns: { "50": "Wurzel ziehen! $x^2 = 50 \\Rightarrow x = \\sqrt{50}$." }
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
const UNIT_ORDER = ['diagnose', 'unit0', 'unit1', 'unit2', 'unit25', 'anwendungen1', 'diagnose2', 'modellierung', 'extremwert', 'final'];

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
