import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

const STORAGE_KEY = "@guara_app_quiz_best";

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface QuestionItem {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const allQuestions: QuestionItem[] = [
  {
    question: "Quem escreveu a letra do Hino de Guarapuava?",
    options: [
      "Luiz Eulógio Zilli",
      "Gilda Boscardim Todeschini",
      "Dom Pedro II",
      "Visconde de Guarapuava",
    ],
    correctAnswer: "Gilda Boscardim Todeschini",
    explanation:
      "A poetisa Gilda Boscardim Todeschini compôs a letra oficial exaltando a beleza e a identidade de Guarapuava.",
  },
  {
    question: "Quem compôs a melodia do hino municipal?",
    options: [
      "Luiz Eulógio Zilli",
      "Heitor Villa-Lobos",
      "Carlos Gomes",
      "Padre Chagas",
    ],
    correctAnswer: "Luiz Eulógio Zilli",
    explanation:
      "O maestro Luiz Eulógio Zilli compôs a solene melodia do hino municipal.",
  },
  {
    question: "Onde está exposta a partitura original do hino?",
    options: [
      "Na Câmara Municipal",
      "No Museu Visconde de Guarapuava",
      "Na Catedral de Belém",
      "Na Biblioteca Pública",
    ],
    correctAnswer: "No Museu Visconde de Guarapuava",
    explanation:
      "O manuscrito original da partitura está preservado no acervo histórico do Museu Visconde de Guarapuava.",
  },
  {
    question: "O hino exalta principalmente:",
    options: [
      "Tecnologia e indústria moderna",
      "Natureza, memória e a bravura do povo",
      "Comércio e navegação exterior",
      "Tradições militares do litoral",
    ],
    correctAnswer: "Natureza, memória e a bravura do povo",
    explanation:
      "Os versos destacam os pinheirais, o sol sobre os trigais e a força dos pioneiros.",
  },
  {
    question: "Guarapuava é poeticamente descrita no hino como:",
    options: [
      "Uma fortaleza antiga",
      "Uma menina radiante",
      "Uma cidade de pedra",
      "Um castelo nas montanhas",
    ],
    correctAnswer: "Uma menina radiante",
    explanation:
      "No hino, a cidade é carinhosamente chamada de 'menina radiante, com o ouro dos trigais a se enfeitar'.",
  },
  {
    question: "Qual expedição iniciou o povoamento colonial em 1810?",
    options: [
      "Bandeirantes Paulistas",
      "Real Expedição de Conquista",
      "Marcha para o Oeste",
      "Expedição Farroupilha",
    ],
    correctAnswer: "Real Expedição de Conquista",
    explanation:
      "A Real Expedição de Conquista de Diogo Pinto de Azevedo Portugal ergueu o Fortim Atalaia em 1810.",
  },
  {
    question: "O que significa 'Guarapuava' em tupi-guarani?",
    options: ["Águas Claras", "Lobo Bravo", "Terra do Frio", "Campo Aberto"],
    correctAnswer: "Lobo Bravo",
    explanation:
      "'Guará' significa lobo-guará e 'Puava' significa bravo ou rumor sonoro.",
  },
  {
    question:
      "Quem foi o mestre de obras que conquistou sua alforria e libertou mais de 50 escravizados?",
    options: [
      "Belmiro de Miranda",
      "Pedro de Siqueira Côrtes",
      "Visconde de Guarapuava",
      "Diogo Pinto",
    ],
    correctAnswer: "Belmiro de Miranda",
    explanation:
      "Belmiro de Miranda comprou sua alforria trabalhando em jornadas noturnas e libertou mais de 50 escravizados em Guarapuava.",
  },
  {
    question:
      "Com qual grande líder abolicionista nacional Belmiro de Miranda mantinha correspondência?",
    options: [
      "José do Patrocínio",
      "Joaquim Nabuco",
      "Castro Alves",
      "Rui Barbosa",
    ],
    correctAnswer: "José do Patrocínio",
    explanation:
      "Belmiro mantinha contato com José do Patrocínio, decorando o conteúdo das cartas para discursar ao povo.",
  },
];

const optionLetters = ["A", "B", "C", "D"];

export default function Quiz() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadBestScore();
    startNewQuiz();
  }, []);

  function startNewQuiz() {
    const shuffled = shuffleArray(allQuestions).slice(0, 5);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setIsCorrect(null);
  }

  async function loadBestScore() {
    try {
      const val = await AsyncStorage.getItem(STORAGE_KEY);
      if (val !== null) {
        setBestScore(parseInt(val, 10));
      }
    } catch (e) {
      console.log("Erro ao carregar recorde:", e);
    }
  }

  async function saveBestScore(newScore: number) {
    try {
      const current = bestScore ?? 0;
      if (newScore > current) {
        await AsyncStorage.setItem(STORAGE_KEY, newScore.toString());
        setBestScore(newScore);
      }
    } catch (e) {
      console.log("Erro ao salvar recorde:", e);
    }
  }

  const currentOptions = useMemo(() => {
    if (!questions[currentQuestion]) return [];
    return shuffleArray(questions[currentQuestion].options);
  }, [questions, currentQuestion]);

  function handleAnswer(option: string) {
    if (selected !== null) return;
    const correct = option === questions[currentQuestion].correctAnswer;
    setSelected(option);
    setIsCorrect(correct);

    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore((prev) => prev + 1);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  function nextQuestion() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      const finalScore = isCorrect ? score : score;
      saveBestScore(finalScore);
      setShowResult(true);
    }
  }

  function restartQuiz() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    startNewQuiz();
  }

  async function handleShare() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `Acabei de acertar ${score} de 5 perguntas no Desafio Histórico de Guarapuava no Guará-App! Acesse: https://guara-app.netlify.app`,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar o resultado.");
    }
  }

  if (questions.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.textMuted }}>Carregando desafio...</Text>
      </View>
    );
  }

  const q = questions[currentQuestion];
  const progressRatio = (currentQuestion + 1) / questions.length;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Desafio de Conhecimento",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      />

      <View style={styles.responsiveWrapper}>
        {!showResult ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* PAINEL DE CONTROLE / PROGRESSO */}
            <View style={styles.hudCard}>
              <View style={styles.hudTopRow}>
                <View style={styles.questionCounterPill}>
                  <Text style={styles.questionCounterText}>
                    PERGUNTA {currentQuestion + 1} DE {questions.length}
                  </Text>
                </View>
                <View style={styles.scorePill}>
                  <Text style={styles.scorePillText}>Acertos: {score}</Text>
                </View>
              </View>

              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progressRatio * 100}%` },
                  ]}
                />
              </View>
            </View>

            {/* PERGUNTA */}
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{q.question}</Text>
            </View>

            {/* OPÇÕES */}
            <View style={styles.optionsGroup}>
              {currentOptions.map((option, idx) => {
                const letter = optionLetters[idx];
                const isSelected = selected === option;
                const isCorrectAnswer =
                  selected !== null && option === q.correctAnswer;
                const isIncorrectSelected =
                  selected !== null && isSelected && option !== q.correctAnswer;

                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optionCard,
                      isCorrectAnswer && styles.optionCardCorrect,
                      isIncorrectSelected && styles.optionCardIncorrect,
                    ]}
                    onPress={() => handleAnswer(option)}
                    activeOpacity={0.8}
                    disabled={selected !== null}
                  >
                    <View
                      style={[
                        styles.letterBadge,
                        isCorrectAnswer && styles.letterBadgeCorrect,
                        isIncorrectSelected && styles.letterBadgeIncorrect,
                      ]}
                    >
                      <Text
                        style={[
                          styles.letterBadgeText,
                          (isCorrectAnswer || isIncorrectSelected) &&
                            styles.letterBadgeTextActive,
                        ]}
                      >
                        {letter}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isCorrectAnswer && styles.optionTextCorrect,
                        isIncorrectSelected && styles.optionTextIncorrect,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* EXPLICAÇÃO PEDAGÓGICA */}
            {selected !== null && (
              <View style={styles.feedbackSection}>
                <View
                  style={[
                    styles.explanationCard,
                    isCorrect
                      ? styles.explanationCardCorrect
                      : styles.explanationCardIncorrect,
                  ]}
                >
                  <View style={styles.feedbackTitleRow}>
                    <Feather
                      name={isCorrect ? "check-circle" : "x-circle"}
                      size={18}
                      color={isCorrect ? colors.correct : colors.incorrect}
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={[
                        styles.feedbackTitle,
                        { color: isCorrect ? colors.correct : colors.incorrect },
                      ]}
                    >
                      {isCorrect ? "Resposta Correta" : "Resposta Incorreta"}
                    </Text>
                  </View>
                  <Text style={styles.explanationText}>{q.explanation}</Text>
                </View>

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={nextQuestion}
                  activeOpacity={0.85}
                >
                  <Text style={styles.nextButtonText}>
                    {currentQuestion < questions.length - 1
                      ? "PRÓXIMA PERGUNTA →"
                      : "VER RESULTADO FINAL"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        ) : (
          /* TELA DE RESULTADO */
          <ScrollView
            contentContainerStyle={styles.resultScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.resultCard}>
              <View style={styles.iconCircle}>
                <Feather name="award" size={40} color={colors.gold} />
              </View>

              <Text style={styles.resultTitle}>Desafio Concluído</Text>

              <View style={styles.scoreBanner}>
                <Text style={styles.scoreBigNumber}>{score}</Text>
                <Text style={styles.scoreOfTotal}>
                  de {questions.length} acertos
                </Text>
              </View>

              <View style={styles.evaluationPill}>
                <Text style={styles.evaluationText}>
                  {score === 5
                    ? "Excelente! Domínio completo da história guarapuavana."
                    : score >= 3
                    ? "Muito bom! Bom conhecimento sobre a nossa terra."
                    : "Bom esforço! Que tal revisar o acervo e tentar novamente?"}
                </Text>
              </View>

              {bestScore !== null && (
                <View style={styles.bestRecordRow}>
                  <Text style={styles.bestRecordText}>
                    Melhor Recorde Registrado:{" "}
                    <Text style={{ color: colors.gold, fontWeight: "700" }}>
                      {bestScore} de 5
                    </Text>
                  </Text>
                </View>
              )}

              <View style={styles.resultActionGroup}>
                <TouchableOpacity
                  style={styles.restartButton}
                  onPress={restartQuiz}
                  activeOpacity={0.85}
                >
                  <Feather name="rotate-ccw" size={16} color={colors.textDark} style={{ marginRight: 8 }} />
                  <Text style={styles.restartButtonText}>JOGAR NOVAMENTE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleShare}
                  activeOpacity={0.85}
                >
                  <Feather name="share-2" size={16} color={colors.text} style={{ marginRight: 8 }} />
                  <Text style={styles.shareButtonText}>COMPARTILHAR RESULTADO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  responsiveWrapper: {
    flex: 1,
    width: "100%",
    maxWidth: colors.layout.maxWidth,
    alignSelf: "center",
  },
  scrollContent: {
    padding: colors.spacing.md,
    paddingBottom: colors.spacing.xl,
  },

  /* HUD */
  hudCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    padding: colors.spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    marginBottom: colors.spacing.md,
  },
  hudTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: colors.spacing.sm,
  },
  questionCounterPill: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: colors.radiusSm,
  },
  questionCounterText: {
    color: colors.goldBright,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  scorePill: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: colors.radiusSm,
  },
  scorePillText: {
    color: colors.goldBright,
    fontSize: 12,
    fontWeight: "700",
  },
  progressBarBg: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.gold,
  },

  /* PERGUNTA */
  questionCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
    marginBottom: colors.spacing.md,
  },
  questionText: {
    fontSize: 17.5,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 25,
  },

  /* OPÇÕES */
  optionsGroup: {
    gap: colors.spacing.sm,
    marginBottom: colors.spacing.md,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
  },
  optionCardCorrect: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderColor: colors.correct,
  },
  optionCardIncorrect: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderColor: colors.incorrect,
  },
  letterBadge: {
    width: 28,
    height: 28,
    borderRadius: colors.radiusSm,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: colors.spacing.md,
  },
  letterBadgeCorrect: {
    backgroundColor: colors.correct,
  },
  letterBadgeIncorrect: {
    backgroundColor: colors.incorrect,
  },
  letterBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.goldBright,
  },
  letterBadgeTextActive: {
    color: "#FFF",
  },
  optionText: {
    fontSize: 15,
    color: colors.textMuted,
    flex: 1,
    lineHeight: 21,
  },
  optionTextCorrect: {
    color: colors.text,
    fontWeight: "600",
  },
  optionTextIncorrect: {
    color: colors.text,
    fontWeight: "600",
  },

  /* FEEDBACK */
  feedbackSection: {
    gap: colors.spacing.md,
  },
  explanationCard: {
    borderRadius: colors.radius,
    padding: colors.spacing.md,
    borderWidth: 1,
  },
  explanationCardCorrect: {
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.25)",
  },
  explanationCardIncorrect: {
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderColor: "rgba(239, 68, 68, 0.25)",
  },
  feedbackTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  explanationText: {
    fontSize: 14.5,
    color: colors.textMuted,
    lineHeight: 21,
  },
  nextButton: {
    backgroundColor: colors.gold,
    minHeight: 48,
    borderRadius: colors.radius,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: colors.textDark,
    fontSize: 13.5,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  /* RESULTADOS */
  resultScrollContent: {
    padding: colors.spacing.md,
    alignItems: "center",
  },
  resultCard: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.lg,
    alignItems: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.goldLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: colors.spacing.md,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    marginBottom: colors.spacing.md,
  },
  scoreBanner: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: colors.spacing.md,
  },
  scoreBigNumber: {
    fontSize: 52,
    fontWeight: "900",
    color: colors.gold,
  },
  scoreOfTotal: {
    fontSize: 16,
    color: colors.textMuted,
  },
  evaluationPill: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingHorizontal: colors.spacing.md,
    paddingVertical: colors.spacing.sm,
    borderRadius: colors.radiusSm,
    marginBottom: colors.spacing.md,
  },
  evaluationText: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
  },
  bestRecordRow: {
    marginBottom: colors.spacing.lg,
  },
  bestRecordText: {
    fontSize: 13,
    color: colors.textSubtle,
  },
  resultActionGroup: {
    width: "100%",
    gap: colors.spacing.sm,
  },
  restartButton: {
    backgroundColor: colors.gold,
    minHeight: 48,
    borderRadius: colors.radius,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  restartButtonText: {
    color: colors.textDark,
    fontSize: 13.5,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  shareButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    minHeight: 48,
    borderRadius: colors.radius,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
