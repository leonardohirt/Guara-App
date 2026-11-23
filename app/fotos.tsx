import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import React, { useState } from "react";
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

const marcosHistoricos = [
  {
    id: 1,
    titulo: "Catedral Nossa Senhora de Belém",
    descricao:
      "O marco zero da fé e da fundação urbana de Guarapuava. A fachada preserva a memória da antiga Freguesia de 1819.",
    imagemAntiga: require("../assets/images/historico/catedral_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/catedral_novo.jpg"),
    fontes: "A Primeira Universidade do Paraná / Acervo Municipal",
    ano: "Século XX vs Atualidade",
  },
  {
    id: 2,
    titulo: "Lagoa das Lágrimas",
    descricao:
      "De antigo reservatório hídrico e parada de tropeiros (o antigo 'Rocio') ao principal cartão postal de convivência no centro.",
    imagemAntiga: require("../assets/images/historico/lagoa_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/lagoa_novo.jpg"),
    fontes: "Paraná Histórica / Secretaria de Turismo",
    ano: "Memória vs Hoje",
  },
  {
    id: 3,
    titulo: "Colégio Est. Francisco Carneiro Martins",
    descricao:
      "Um dos templos pioneiros da educação no 3º Planalto, abrigando gerações de cidadãos em sua estrutura arquitetônica clássica.",
    imagemAntiga: require("../assets/images/historico/carneiro_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/carneiro_novo.jpg"),
    fontes: "Memória Urbana de Guarapuava",
    ano: "Educação & Tradição",
  },
  {
    id: 4,
    titulo: "Museu Visconde de Guarapuava",
    descricao:
      "Casarão histórico tombado pelo patrimônio estadual que guarda a partitura original do hino e o acervo pioneiro da colonização.",
    imagemAntiga: require("../assets/images/historico/museu_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/museu_novo.jpg"),
    fontes: "Patrimônio Cultural do Paraná",
    ano: "Preservação da Identidade",
  },
  {
    id: 5,
    titulo: "Parque do Lago",
    descricao:
      "Área de preservação e lazer que se transformou em um dos cenários ambientais mais emblemáticos do município.",
    imagemAntiga: require("../assets/images/historico/lago_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/lago_novo.jpg"),
    fontes: "Guarapuava Histórica / Fotografia Contemporânea",
    ano: "Evolução Urbana",
  },
];

export default function FotosHistoricas() {
  const [imgSelecionada, setImgSelecionada] = useState<{
    src: any;
    titulo: string;
    legenda: string;
  } | null>(null);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Ontem e Hoje",
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
          
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ICONOGRAFIA COMPARADA</Text>
            </View>
            <Text style={styles.headerTitle}>Memória Urbana</Text>
            <Text style={styles.headerSubtitle}>
              Toque nas imagens para inspecionar em alta definição as transformações arquitetônicas de Guarapuava.
            </Text>
          </View>

          {/* LISTA DE MARCOS */}
          <View style={styles.cardsContainer}>
            {marcosHistoricos.map((marco) => (
              <View key={marco.id} style={styles.card}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.marcoTitle}>{marco.titulo}</Text>
                  <View style={styles.eraPill}>
                    <Text style={styles.eraPillText}>{marco.ano}</Text>
                  </View>
                </View>

                <Text style={styles.marcoDescricao}>{marco.descricao}</Text>

                {/* COMPARATIVO LADO A LADO */}
                <View style={styles.imageGridRow}>
                  {/* ANTIGA */}
                  <Pressable
                    style={styles.imageWrapper}
                    onPress={() =>
                      setImgSelecionada({
                        src: marco.imagemAntiga,
                        titulo: marco.titulo,
                        legenda: "Registro Histórico de Arquivo",
                      })
                    }
                  >
                    <Image
                      source={marco.imagemAntiga}
                      style={styles.imageThumb}
                      contentFit="cover"
                      transition={200}
                    />
                    <View style={[styles.labelTag, styles.tagAntiga]}>
                      <Text style={styles.labelText}>ANTIGA</Text>
                    </View>
                    <View style={styles.zoomPill}>
                      <Feather name="maximize-2" size={12} color="#FFF" />
                    </View>
                  </Pressable>

                  {/* ATUAL */}
                  <Pressable
                    style={styles.imageWrapper}
                    onPress={() =>
                      setImgSelecionada({
                        src: marco.imagemAtual,
                        titulo: marco.titulo,
                        legenda: "Registro Contemporâneo",
                      })
                    }
                  >
                    <Image
                      source={marco.imagemAtual}
                      style={styles.imageThumb}
                      contentFit="cover"
                      transition={200}
                    />
                    <View style={[styles.labelTag, styles.tagAtual]}>
                      <Text style={styles.labelText}>ATUAL</Text>
                    </View>
                    <View style={styles.zoomPill}>
                      <Feather name="maximize-2" size={12} color="#FFF" />
                    </View>
                  </Pressable>
                </View>

                <Text style={styles.fontesText}>Fonte: {marco.fontes}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.footerText}>
              Acervo Histórico de Guarapuava • Fotografias Autênticas Catalogadas
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* MODAL DE ZOOM / LIGHTBOX */}
      <Modal
        visible={!!imgSelecionada}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImgSelecionada(null)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setImgSelecionada(null)}
            activeOpacity={0.8}
          >
            <Feather name="x" size={20} color="#FFF" />
          </TouchableOpacity>

          {imgSelecionada && (
            <View style={styles.lightboxContent}>
              <Image
                source={imgSelecionada.src}
                style={styles.lightboxImage}
                contentFit="contain"
                transition={200}
              />
              <View style={styles.lightboxCaptionBox}>
                <Text style={styles.lightboxTitle}>{imgSelecionada.titulo}</Text>
                <Text style={styles.lightboxSubtitle}>{imgSelecionada.legenda}</Text>
              </View>
            </View>
          )}
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
  header: {
    marginBottom: colors.spacing.lg,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.goldLight,
    paddingHorizontal: colors.spacing.sm,
    paddingVertical: colors.spacing.xs,
    borderRadius: colors.radiusSm,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.goldBright,
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15.5,
    color: colors.textMuted,
    lineHeight: 23,
  },

  cardsContainer: {
    gap: colors.spacing.lg,
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
    alignItems: "flex-start",
    marginBottom: 6,
    gap: colors.spacing.sm,
  },
  marcoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
  },
  eraPill: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: colors.radiusSm,
  },
  eraPillText: {
    fontSize: 11,
    color: colors.goldBright,
    fontWeight: "600",
  },
  marcoDescricao: {
    fontSize: 14.5,
    color: colors.textMuted,
    lineHeight: 21,
    marginBottom: colors.spacing.md,
  },

  imageGridRow: {
    flexDirection: "row",
    gap: colors.spacing.sm,
    marginBottom: colors.spacing.sm,
  },
  imageWrapper: {
    flex: 1,
    height: 155,
    borderRadius: colors.radiusSm,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
  },
  imageThumb: {
    width: "100%",
    height: "100%",
  },
  labelTag: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
  },
  tagAntiga: {
    backgroundColor: "rgba(11, 15, 23, 0.85)",
  },
  tagAtual: {
    backgroundColor: "rgba(197, 160, 89, 0.9)",
  },
  labelText: {
    color: "#FFF",
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  zoomPill: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  fontesText: {
    fontSize: 12,
    color: colors.textSubtle,
    fontStyle: "italic",
    marginTop: 4,
  },

  /* LIGHTBOX */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.94)",
    justifyContent: "center",
    alignItems: "center",
    padding: colors.spacing.md,
  },
  modalCloseButton: {
    position: "absolute",
    top: 48,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  lightboxContent: {
    width: "100%",
    maxWidth: 700,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  lightboxImage: {
    width: "100%",
    height: "80%",
  },
  lightboxCaptionBox: {
    marginTop: colors.spacing.md,
    alignItems: "center",
    paddingHorizontal: colors.spacing.md,
  },
  lightboxTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 4,
  },
  lightboxSubtitle: {
    fontSize: 14,
    color: colors.goldBright,
    textAlign: "center",
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
