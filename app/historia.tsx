import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

const timelineEvents = [
  {
    year: "1770",
    title: "Descoberta dos Campos Gerais",
    description:
      "Reconhecimento cartográfico dos primitivos campos com cerca de 175.000 km², habitados por povos originários e denominados Guarapuava ('Lobo Bravo').",
  },
  {
    year: "1810",
    date: "17 de Junho",
    title: "A Real Expedição & Fortim Atalaia",
    description:
      "Sob o comando de Diogo Pinto de Azevedo Portugal, a expedição estabelece o Fortim Atalaia para fixar o povoamento colonial do Terceiro Planalto.",
  },
  {
    year: "1819",
    date: "09 de Dezembro",
    title: "Freguesia de N. Sra. de Belém",
    description:
      "Demarcação solene pelo Padre Chagas e início da organização civil e religiosa em torno da praça da Matriz.",
  },
  {
    year: "1871",
    date: "12 de Abril",
    title: "Elevação à Categoria de Cidade",
    description:
      "A Vila de Guarapuava conquista o status oficial de Cidade, consolidando-se como o polo econômico e cultural regional.",
  },
];

export default function Historia() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "História e Símbolos",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.responsiveWrapper}>
          
          {/* CABEÇALHO COM IMAGEM HISTÓRICA */}
          <View style={styles.imageCard}>
            <Image
              source={require("../assets/images/lagoa.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <View style={styles.imageBadge}>
                <Text style={styles.imageBadgeText}>PATRIMÔNIO HISTÓRICO</Text>
              </View>
              <Text style={styles.imageHeroTitle}>Origens de Guarapuava</Text>
            </View>
          </View>

          {/* INTRODUÇÃO EDITORIAL */}
          <View style={styles.sectionBlock}>
            <Text style={styles.leadText}>
              O topônimo <Text style={styles.highlightBold}>Guarapuava</Text> provém da língua tupi-guarani:{" "}
              <Text style={styles.italicText}>guará</Text> (lobo-guará) e{" "}
              <Text style={styles.italicText}>puava</Text> (bravo ou rumor sonoro), batizando a vastidão dos campos do centro do Paraná.
            </Text>
          </View>

          {/* LINHA DO TEMPO CRONOLÓGICA */}
          <View style={styles.timelineSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>CRONOLOGIA FUNDACIONAL</Text>
              <View style={styles.sectionDivider} />
            </View>

            {timelineEvents.map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineSidebar}>
                  <View style={styles.timelineDot} />
                  {index !== timelineEvents.length - 1 && <View style={styles.timelineTrack} />}
                </View>

                <View style={styles.timelineContent}>
                  <View style={styles.yearTagRow}>
                    <Text style={styles.yearNumber}>{item.year}</Text>
                    {item.date && <Text style={styles.dateLabel}> • {item.date}</Text>}
                  </View>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineDesc}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* SÍMBOLOS CÍVICOS — LISTA EDITORIAL (SEM REPETIÇÃO DE CARTÕES) */}
          <View style={styles.simbolosSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>SÍMBOLOS E DOCUMENTAÇÃO</Text>
              <View style={styles.sectionDivider} />
            </View>

            <View style={styles.editorialList}>
              <View style={styles.editorialRow}>
                <View style={styles.editorialIconBox}>
                  <Feather name="feather" size={18} color={colors.gold} />
                </View>
                <View style={styles.editorialTextCol}>
                  <Text style={styles.editorialLabel}>Autoria do Hino Municipal</Text>
                  <Text style={styles.editorialValue}>
                    Letra por Gilda Boscardim Todeschini • Melodia por Luiz Eulógio Zilli
                  </Text>
                </View>
              </View>

              <View style={styles.editorialRow}>
                <View style={styles.editorialIconBox}>
                  <Feather name="archive" size={18} color={colors.gold} />
                </View>
                <View style={styles.editorialTextCol}>
                  <Text style={styles.editorialLabel}>Partitura Original</Text>
                  <Text style={styles.editorialValue}>
                    Manuscrito histórico sob salvaguarda do Museu Visconde de Guarapuava
                  </Text>
                </View>
              </View>

              <View style={styles.editorialRow}>
                <View style={styles.editorialIconBox}>
                  <Feather name="map-pin" size={18} color={colors.gold} />
                </View>
                <View style={styles.editorialTextCol}>
                  <Text style={styles.editorialLabel}>Geografia e Altitude</Text>
                  <Text style={styles.editorialValue}>
                    1.100 metros de altitude média no Terceiro Planalto Paranaense
                  </Text>
                </View>
              </View>
            </View>

            {/* CITAÇÃO POÉTICA */}
            <View style={styles.quoteBlock}>
              <Text style={styles.quoteBody}>
                “Guarapuava é menina radiante, com o ouro dos trigais a se enfeitar! Teu vulto sem igual, pinheiro magistral, eu sempre hei de cantar com ardor!”
              </Text>
              <Text style={styles.quoteAuthor}>— Versos do Hino Municipal de Guarapuava</Text>
            </View>
          </View>

        </View>
      </ScrollView>
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
    paddingTop: colors.spacing.sm,
    paddingBottom: colors.spacing.xl,
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: colors.layout.maxWidth,
    alignSelf: "center",
  },

  /* IMAGEM HERO */
  imageCard: {
    width: "100%",
    height: 220,
    borderRadius: colors.radius,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    marginBottom: colors.spacing.lg,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11, 15, 23, 0.55)",
    justifyContent: "flex-end",
    padding: colors.spacing.md,
  },
  imageBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.gold,
    paddingHorizontal: colors.spacing.sm,
    paddingVertical: colors.spacing.xs,
    borderRadius: colors.radiusSm,
    marginBottom: 6,
  },
  imageBadgeText: {
    color: colors.textDark,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  imageHeroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
  },

  /* LEAD */
  sectionBlock: {
    marginBottom: colors.spacing.lg,
  },
  leadText: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 25,
  },
  highlightBold: {
    color: colors.text,
    fontWeight: "700",
  },
  italicText: {
    color: colors.goldBright,
    fontStyle: "italic",
  },

  /* TIMELINE */
  timelineSection: {
    marginBottom: colors.spacing.xl,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: colors.spacing.sm,
    marginBottom: colors.spacing.md,
  },
  sectionTitle: {
    color: colors.textSubtle,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: colors.spacing.md,
  },
  timelineSidebar: {
    width: 24,
    alignItems: "center",
    marginRight: colors.spacing.sm,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold,
    marginTop: 6,
  },
  timelineTrack: {
    width: 2,
    flex: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
  },
  yearTagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  yearNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.gold,
  },
  dateLabel: {
    fontSize: 13,
    color: colors.textSubtle,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  timelineDesc: {
    fontSize: 14.5,
    color: colors.textMuted,
    lineHeight: 21,
  },

  /* SÍMBOLOS & CITAÇÃO */
  simbolosSection: {
    marginBottom: colors.spacing.xl,
  },
  editorialList: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
    gap: colors.spacing.md,
    marginBottom: colors.spacing.lg,
  },
  editorialRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: colors.spacing.md,
  },
  editorialIconBox: {
    width: 38,
    height: 38,
    borderRadius: colors.radiusSm,
    backgroundColor: colors.goldLight,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  editorialTextCol: {
    flex: 1,
  },
  editorialLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  editorialValue: {
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 19,
  },

  /* CITAÇÃO */
  quoteBlock: {
    backgroundColor: "rgba(197, 160, 89, 0.06)",
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
    borderRadius: colors.radiusSm,
    padding: colors.spacing.md,
  },
  quoteBody: {
    fontSize: 15,
    fontStyle: "italic",
    color: colors.text,
    lineHeight: 23,
    marginBottom: colors.spacing.sm,
  },
  quoteAuthor: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.goldBright,
    letterSpacing: 0.3,
  },
});
