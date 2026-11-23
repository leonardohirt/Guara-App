import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

export default function Config() {
  const version = "1.2.0";
  const devName = "Leonardo Hirt Moraes";

  const abrirLink = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sobre o Aplicativo",
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
          
          {/* HEADER / IDENTIDADE DO APP */}
          <View style={styles.heroCard}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/icon.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.appName}>Guará-App</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionBadgeText}>VERSÃO {version} • PRODUÇÃO</Text>
            </View>
            <Text style={styles.appSubtitle}>
              Plataforma de preservação e difusão do hino municipal, historiografia
              oficial, tradições orais e patrimônio de Guarapuava — PR.
            </Text>
          </View>

          {/* DESENVOLVEDOR */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AUTORIA E DESENVOLVIMENTO</Text>
            <View style={styles.card}>
              <View style={styles.devRow}>
                <View style={styles.avatarBadge}>
                  <Feather name="code" size={18} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.devLabel}>Proponente & Desenvolvedor:</Text>
                  <Text style={styles.devName}>{devName}</Text>
                  <Text style={styles.devAcademic}>
                    Graduando em Sistemas para Internet • UTFPR Campus Guarapuava
                  </Text>
                </View>
              </View>

              <View style={styles.linksContainer}>
                <TouchableOpacity
                  style={styles.outlineButton}
                  activeOpacity={0.8}
                  onPress={() => abrirLink("https://github.com/leonardohirt")}
                >
                  <Feather name="github" size={16} color={colors.text} style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Perfil no GitHub</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.outlineButton}
                  activeOpacity={0.8}
                  onPress={() =>
                    abrirLink("https://github.com/leonardohirt/APP-Guarapuava")
                  }
                >
                  <Feather name="terminal" size={16} color={colors.text} style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Repositório do Código</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* CRÉDITOS HISTÓRICOS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CRÉDITOS HISTÓRICOS E ACERVO</Text>
            <View style={styles.card}>
              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="feather" size={16} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditLabel}>Letra do Hino Municipal</Text>
                  <Text style={styles.creditValue}>Gilda Boscardim Todeschini</Text>
                </View>
              </View>

              <View style={styles.creditDivider} />

              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="music" size={16} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditLabel}>Música do Hino Municipal</Text>
                  <Text style={styles.creditValue}>Luiz Eulógio Zilli</Text>
                </View>
              </View>

              <View style={styles.creditDivider} />

              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="archive" size={16} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditLabel}>Acervo e Partitura Histórica</Text>
                  <Text style={styles.creditValue}>
                    Museu Municipal Visconde de Guarapuava
                  </Text>
                </View>
              </View>

              <View style={styles.creditDivider} />

              <View style={styles.creditItem}>
                <View style={styles.creditIconBox}>
                  <Feather name="book" size={16} color={colors.gold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.creditLabel}>Pesquisa & Biografias</Text>
                  <Text style={styles.creditValue}>
                    ALAC (Academia de Letras, Artes e Ciências de Guarapuava)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* CARACTERÍSTICAS TÉCNICAS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ARQUITETURA DE ENGENHARIA</Text>
            <View style={styles.card}>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>100% Autônomo e Funcional Offline</Text>
              </View>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>Áudios neurais de estúdio integrados</Text>
              </View>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>Respostas táteis nativas (Haptic Feedback)</Text>
              </View>
              <View style={styles.featureRow}>
                <Feather name="check" size={16} color={colors.gold} style={{ marginRight: 10 }} />
                <Text style={styles.featureText}>Armazenamento e recordes locais seguros</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Guará-App • Guarapuava - Paraná • 2026
            </Text>
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
    paddingTop: colors.spacing.md,
    paddingBottom: colors.spacing.xl,
  },
  responsiveWrapper: {
    width: "100%",
    maxWidth: colors.layout.maxWidth,
    alignSelf: "center",
  },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    padding: colors.spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    marginBottom: colors.spacing.lg,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: colors.radius,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: colors.spacing.sm,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: colors.radiusSm,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
  },
  versionBadge: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: colors.radiusSm,
    marginTop: 4,
    marginBottom: colors.spacing.sm,
  },
  versionBadgeText: {
    color: colors.goldBright,
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 14.5,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 520,
  },

  section: {
    marginBottom: colors.spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 1.5,
    marginBottom: colors.spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
  },
  devRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: colors.spacing.md,
    gap: colors.spacing.md,
  },
  avatarBadge: {
    width: 38,
    height: 38,
    borderRadius: colors.radiusSm,
    backgroundColor: colors.goldLight,
    justifyContent: "center",
    alignItems: "center",
  },
  devLabel: {
    fontSize: 12,
    color: colors.textSubtle,
    marginBottom: 2,
  },
  devName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  devAcademic: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  linksContainer: {
    gap: colors.spacing.sm,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    minHeight: 44,
    borderRadius: colors.radius,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: colors.spacing.md,
  },
  buttonText: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: "600",
  },

  /* CRÉDITOS */
  creditItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: colors.spacing.md,
  },
  creditIconBox: {
    width: 32,
    height: 32,
    borderRadius: colors.radiusSm,
    backgroundColor: colors.goldLight,
    justifyContent: "center",
    alignItems: "center",
  },
  creditLabel: {
    fontSize: 12,
    color: colors.textSubtle,
  },
  creditValue: {
    fontSize: 14.5,
    fontWeight: "600",
    color: colors.text,
  },
  creditDivider: {
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginVertical: colors.spacing.sm,
  },

  /* ESPECIFICAÇÕES */
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  featureText: {
    fontSize: 14,
    color: colors.textMuted,
  },

  footerContainer: {
    paddingTop: colors.spacing.md,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.textSubtle,
    textAlign: "center",
  },
});
