import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

interface LendaItem {
  id: number;
  titulo: string;
  autor: string;
  tempoLeitura: string;
  historia: string;
  tag: string;
  audioFile: any;
}

const listaLendas: LendaItem[] = [
  {
    id: 1,
    titulo: "Lagoa das Lágrimas",
    autor: "Nivaldo Krüger",
    tempoLeitura: "2 min",
    tag: "MEMÓRIA INDÍGENA",
    audioFile: require("../assets/audio/lendas/lenda_lagoa.mp3"),
    historia:
      "Atualmente, a Lagoa está situada em um espaço em que havia um vale profundo. Há muitos anos, os índios ‘Dorin’ se preparavam para um combate contra os inimigos, os ‘Votorão’.\n\nO cacique dos Dorin, jovem e valente, escondia nesse vale crianças, mulheres e anciãos. Contudo, ao se despedir da noiva, ele disse: “vou honrar a coragem de nossa gente, me espere aqui, voltarei para casarmos e termos muitos filhos”.\n\nDurante o combate os Dorin venceram, porém o cacique morreu como um guerreiro valente. Assim, a tribo retornou ao sertão da Serra da Esperança. Entretanto, a noiva ficou esperando o cacique que havia prometido voltar. Assim sendo, deprimida sobre uma laje, ela chorou desconsolada e fiel.\n\nPor fim, alguns invernos mais tarde, os Dorin encontraram nas fendas da laje duas vertentes de águas cristalinas. Assim nasceu a Lagoa das Lágrimas, um espelho d’água que sempre irá refletir essa história, como um símbolo de fidelidade da mulher pelo amor que nunca será esquecido.",
  },
  {
    id: 2,
    titulo: "Capela do Degolado",
    autor: "Tradição Popular (via Lab Dicas)",
    tempoLeitura: "2 min",
    tag: "DEVOÇÃO POPULAR",
    audioFile: require("../assets/audio/lendas/lenda_degolado.mp3"),
    historia:
      "Um dos marcos mais misteriosos de Guarapuava, a Capela do Degolado guarda a memória de um jovem soldado que, em tempos de conflito, teria desertado em busca de refúgio. Confundido injustamente com um criminoso após buscar comida em uma fazenda, o jovem foi capturado e teve um fim trágico nas proximidades da atual Rua General Carneiro.\n\nA lenda afirma que, por ter sido vítima de uma injustiça fatal, o soldado tornou-se um 'santo popular'. Com o passar das décadas, a pequena capela construída no local da sua morte tornou-se um ponto de intensa devoção.\n\nRelatos de milagres e fenômenos sobrenaturais — como o vulto do soldado zelando pela região e o curioso fato de imagens deixadas no local aparecerem sem a cabeça — mantêm viva a chama desta história que mistura fé, tragédia e o folclore guarapuavano.",
  },
  {
    id: 3,
    titulo: "A Serpente da Lagoa",
    autor: "Tradição Oral Urbana",
    tempoLeitura: "3 min",
    tag: "FOLCLORE URBANO",
    audioFile: require("../assets/audio/lendas/lenda_serpente.mp3"),
    historia:
      "Durante o século XX, uma história curiosa começou a circular entre mães e professores para evitar que as crianças faltassem às aulas: a existência de uma serpente gigante que dormia entre a Catedral e a Lagoa das Lágrimas.\n\nA versão mais famosa dizia que o despertar da fera ocorreria com a inauguração da estação ferroviária; o apito do primeiro trem a enfureceria, fazendo-a destruir a cidade. Quando o trem chegou e nada aconteceu, a lenda se adaptou: diziam agora que, se a antiga Catedral fosse demolida para a construção de uma nova, o animal acordaria.\n\nCuriosamente, essa crença popular foi tão forte que ajudou a interromper planos de demolição da igreja na época. Assim, entre o medo e o respeito à tradição, a Catedral permaneceu de pé e Guarapuava seguiu salva da fúria da serpente, que — segundo contam os antigos — continua em seu sono profundo sob nossas águas.",
  },
  {
    id: 4,
    titulo: "Belmiro de Miranda: O Construtor da Liberdade",
    autor: "ALAC (Acad. de Letras, Artes e Ciências)",
    tempoLeitura: "4 min",
    tag: "HERÓI ABOLICIONISTA",
    audioFile: require("../assets/audio/lendas/lenda_belmiro.mp3"),
    historia:
      "Abolicionista e construtor histórico de Guarapuava, Belmiro de Miranda nasceu em Alagoas em 1825, filho da escrava Lucinda, comprada na costa leste da África.\n\nDe profissão mestre de obras e exímio em taipa de pilão, foi trazido a Guarapuava pelo bandeirante Pedro de Siqueira Côrtes para erguer o primeiro palacete da cidade, no pátio da Matriz. Homem de constituição robusta e extraordinária inteligência para os serviços de pedreiro e carpinteiro, Belmiro obteve a rara permissão de trabalhar para terceiros aos domingos, dias santificados e em noites enluaradas, das 22h às 24h.\n\nCom trabalho árduo e o fruto do seu suor, acumulou o dinheiro necessário para comprar a própria alforria. Em 1880, conseguiu recursos para libertar também sua futura esposa, Ezidia Efigênia. Ao lado de Ezidia, exímia cozinheira, passou a investir cada centavo na libertação de antigos companheiros, conquistando a alforria de mais de 50 escravizados em Guarapuava e orientando-os na vida em liberdade.\n\nMesmo sem saber ler ou escrever, Belmiro mantinha contínua correspondência com o líder abolicionista nacional José do Patrocínio através de amigos. Decorava palavra por palavra das cartas recebidas para discursar ao povo nas senzalas e em praça pública, mantendo acesa a chama da liberdade.\n\nEm 13 de maio de 1888, recebeu por telégrafo a sonhada notícia da Abolição da Escravatura no Brasil e organizou grandes festejos cívicos ao lado do Visconde de Guarapuava. Posteriormente, fundou o pioneiro Hotel do Comércio e criou o 'Caixão da Misericórdia' para garantir sepultamento digno e gratuito aos indigentes.\n\nBelmiro de Miranda faleceu em 1910, deixando o legado eterno de um homem que deixou de ser cativo de um senhor para tornar-se cativo do ideal de servir à humanidade.",
  },
];

function formatMillis(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function Lendas() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lendaSelecionada, setLendaSelecionada] = useState<LendaItem | null>(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  async function toggleAudio(item: LendaItem) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (playingId === item.id && soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(
        item.audioFile,
        { shouldPlay: true }
      );
      soundRef.current = sound;
      setPlayingId(item.id);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setPosition(status.positionMillis);
        if (status.durationMillis) {
          setDuration(status.durationMillis);
        }
        if (status.didJustFinish) {
          setIsPlaying(false);
          setPosition(0);
        }
      });
    } catch (e) {
      console.log("Erro ao carregar áudio:", e);
    }
  }

  function pararAudio() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (soundRef.current) {
      soundRef.current.stopAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  }

  function abrirLeitura(item: LendaItem) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLendaSelecionada(item);
  }

  function fecharLeitura() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLendaSelecionada(null);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Mitos e Tradições",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.responsiveWrapper}>
          
          <View style={styles.headerBlock}>
            <Text style={styles.headerTag}>HISTORIOGRAFIA & TRADIÇÃO ORAL</Text>
            <Text style={styles.headerTitle}>Narrativas e Vultos</Text>
            <Text style={styles.headerDesc}>
              Relatos catalogados com narração neural de estúdio para inclusão e acessibilidade.
            </Text>
          </View>

          {/* LISTA DE NARRATIVAS */}
          <View style={styles.listContainer}>
            {listaLendas.map((item) => {
              const isItemActive = playingId === item.id;
              const progressPercent =
                isItemActive && duration > 0 ? (position / duration) * 100 : 0;

              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.tagPill}>
                      <Text style={styles.tagText}>{item.tag}</Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.audioButton,
                        isItemActive && isPlaying && styles.audioButtonActive,
                      ]}
                      onPress={() => toggleAudio(item)}
                      activeOpacity={0.8}
                    >
                      <Feather
                        name={isItemActive && isPlaying ? "pause" : "headphones"}
                        size={14}
                        color={isItemActive && isPlaying ? colors.textDark : colors.goldBright}
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        style={[
                          styles.audioButtonText,
                          isItemActive && isPlaying && styles.audioButtonTextActive,
                        ]}
                      >
                        {isItemActive && isPlaying ? "PAUSAR" : "OUVIR ÁUDIO"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardAuthor}>
                    Fonte: {item.autor} • {item.tempoLeitura} de leitura
                  </Text>

                  <Text style={styles.cardPreview} numberOfLines={3}>
                    {item.historia}
                  </Text>

                  {/* PROGRESSO DO ÁUDIO */}
                  {isItemActive && (
                    <View style={styles.audioProgressWrapper}>
                      <View style={styles.progressBarTrack}>
                        <View
                          style={[
                            styles.progressBarFill,
                            { width: `${progressPercent}%` },
                          ]}
                        />
                      </View>
                      <View style={styles.progressTimeRow}>
                        <Text style={styles.progressTimeText}>
                          {formatMillis(position)}
                        </Text>
                        <Text style={styles.progressTimeText}>
                          {formatMillis(duration)}
                        </Text>
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.cardFooterAction}
                    onPress={() => abrirLeitura(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.readMoreText}>LER HISTÓRIA COMPLETA</Text>
                    <Feather name="arrow-right" size={16} color={colors.gold} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.footerText}>
              Fonte: Historiografia e Tradição Popular de Guarapuava • Acervo ALAC
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* MODAL DO LEITOR COMPLETO */}
      <Modal
        visible={!!lendaSelecionada}
        animationType="slide"
        transparent={true}
        onRequestClose={fecharLeitura}
      >
        <View style={styles.modalBackdrop}>
          {lendaSelecionada && (() => {
            const isModalActive = playingId === lendaSelecionada.id;
            const modalProgress =
              isModalActive && duration > 0 ? (position / duration) * 100 : 0;

            return (
              <View style={styles.modalContainer}>
                
                {/* TOOLBAR */}
                <View style={styles.modalToolbar}>
                  <TouchableOpacity
                    onPress={fecharLeitura}
                    style={styles.modalBackButton}
                    activeOpacity={0.7}
                  >
                    <Feather name="arrow-left" size={18} color={colors.text} style={{ marginRight: 6 }} />
                    <Text style={styles.modalBackText}>Voltar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.modalAudioButton,
                      isModalActive && isPlaying && styles.modalAudioButtonActive,
                    ]}
                    onPress={() => toggleAudio(lendaSelecionada)}
                    activeOpacity={0.8}
                  >
                    <Feather
                      name={isModalActive && isPlaying ? "pause" : "headphones"}
                      size={15}
                      color={isModalActive && isPlaying ? colors.textDark : colors.goldBright}
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={[
                        styles.modalAudioButtonText,
                        isModalActive && isPlaying && styles.modalAudioButtonTextActive,
                      ]}
                    >
                      {isModalActive && isPlaying ? "PAUSAR NARRAÇÃO" : "OUVIR EM VOZ ALTA"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* DOCK DE STATUS DO ÁUDIO */}
                {isModalActive && (
                  <View style={styles.modalAudioDock}>
                    <View style={styles.dockHeader}>
                      <Text style={styles.dockStatus}>
                        {isPlaying ? "Reproduzindo narração neural em estúdio..." : "Narração pausada"}
                      </Text>
                      <TouchableOpacity onPress={pararAudio} activeOpacity={0.7}>
                        <Text style={styles.dockStop}>PARAR ✕</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modalProgressTrack}>
                      <View
                        style={[
                          styles.modalProgressFill,
                          { width: `${modalProgress}%` },
                        ]}
                      />
                    </View>
                    <View style={styles.progressTimeRow}>
                      <Text style={styles.progressTimeText}>{formatMillis(position)}</Text>
                      <Text style={styles.progressTimeText}>{formatMillis(duration)}</Text>
                    </View>
                  </View>
                )}

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.modalContentScroll}
                >
                  <View style={styles.modalTag}>
                    <Text style={styles.modalTagText}>{lendaSelecionada.tag}</Text>
                  </View>

                  <Text style={styles.modalTitle}>{lendaSelecionada.titulo}</Text>

                  <Text style={styles.modalAuthor}>
                    Registro Histórico: {lendaSelecionada.autor}
                  </Text>

                  <View style={styles.modalDivider} />

                  {lendaSelecionada.historia.split("\n\n").map((paragrafo, idx) => (
                    <Text key={idx} style={styles.modalParagraph}>
                      {paragrafo}
                    </Text>
                  ))}

                  <TouchableOpacity
                    style={styles.modalBottomClose}
                    onPress={fecharLeitura}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.modalBottomCloseText}>CONCLUIR LEITURA</Text>
                  </TouchableOpacity>
                </ScrollView>

              </View>
            );
          })()}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: colors.spacing.md,
    paddingTop: colors.spacing.md,
    paddingBottom: colors.spacing.xl,
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: colors.layout.maxWidth,
    alignSelf: "center",
  },
  headerBlock: {
    marginBottom: colors.spacing.lg,
  },
  headerTag: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 15.5,
    color: colors.textMuted,
    lineHeight: 23,
  },

  /* LISTA */
  listContainer: {
    gap: colors.spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: colors.spacing.sm,
  },
  tagPill: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: colors.spacing.sm,
    paddingVertical: colors.spacing.xs,
    borderRadius: colors.radiusSm,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.goldBright,
    letterSpacing: 1,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(197, 160, 89, 0.08)",
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: colors.spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: colors.radiusSm,
  },
  audioButtonActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  audioButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.goldBright,
    letterSpacing: 0.5,
  },
  audioButtonTextActive: {
    color: colors.textDark,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 13,
    color: colors.textSubtle,
    marginBottom: colors.spacing.sm,
  },
  cardPreview: {
    fontSize: 14.5,
    color: colors.textMuted,
    lineHeight: 21,
    marginBottom: colors.spacing.md,
  },
  audioProgressWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    padding: colors.spacing.sm,
    borderRadius: colors.radiusSm,
    marginBottom: colors.spacing.sm,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.gold,
  },
  progressTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressTimeText: {
    fontSize: 11,
    color: colors.textSubtle,
    fontVariant: ["tabular-nums"],
  },
  cardFooterAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: colors.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorderSubtle,
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 0.8,
  },

  /* MODAL */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: colors.background,
    height: "92%",
    borderTopLeftRadius: colors.radiusLg,
    borderTopRightRadius: colors.radiusLg,
    width: "100%",
    maxWidth: colors.layout.maxWidth,
    alignSelf: "center",
    overflow: "hidden",
  },
  modalToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: colors.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorderSubtle,
    backgroundColor: colors.card,
  },
  modalBackButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  modalBackText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  modalAudioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(197, 160, 89, 0.1)",
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: colors.radiusSm,
  },
  modalAudioButtonActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  modalAudioButtonText: {
    color: colors.goldBright,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  modalAudioButtonTextActive: {
    color: colors.textDark,
  },
  modalAudioDock: {
    backgroundColor: colors.card,
    paddingHorizontal: colors.spacing.md,
    paddingVertical: colors.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorderSubtle,
  },
  dockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  dockStatus: {
    fontSize: 12,
    color: colors.goldBright,
  },
  dockStop: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.incorrect,
  },
  modalProgressTrack: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  modalProgressFill: {
    height: "100%",
    backgroundColor: colors.gold,
  },
  modalContentScroll: {
    padding: colors.spacing.lg,
    paddingBottom: colors.spacing.xl * 2,
  },
  modalTag: {
    alignSelf: "flex-start",
    backgroundColor: colors.goldLight,
    paddingHorizontal: colors.spacing.sm,
    paddingVertical: 4,
    borderRadius: colors.radiusSm,
    marginBottom: colors.spacing.sm,
  },
  modalTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.goldBright,
    letterSpacing: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  modalAuthor: {
    fontSize: 13,
    color: colors.textSubtle,
    marginBottom: colors.spacing.md,
  },
  modalDivider: {
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginBottom: colors.spacing.md,
  },
  modalParagraph: {
    fontSize: 16.5,
    color: colors.textMuted,
    lineHeight: 27,
    marginBottom: colors.spacing.md,
  },
  modalBottomClose: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    minHeight: 48,
    borderRadius: colors.radius,
    justifyContent: "center",
    alignItems: "center",
    marginTop: colors.spacing.lg,
  },
  modalBottomCloseText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 1,
  },

  /* FOOTER */
  footerNote: {
    paddingTop: colors.spacing.lg,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.textSubtle,
    textAlign: "center",
  },
});
