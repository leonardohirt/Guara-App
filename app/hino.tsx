import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

const lyrics = [
  { text: "O Sol surgiu, um dia, mais brilhante", start: 4000, end: 7000 },
  { text: "E foi, risonho as flores acordar.", start: 8000, end: 11000 },
  { text: "O riacho, sobre as pedras, a cantar", start: 12000, end: 16000 },
  { text: "A cidade que surgia triunfante!", start: 17000, end: 20000 },
  { text: "Com fervor, nós te saudamos, Guarapuava", start: 21000, end: 25000 },
  { text: "Neste hino de Louvor!", start: 26000, end: 30000 },
  { text: "Teu vulto sem igual", start: 31000, end: 32000 },
  { text: "Pinheiro magistral", start: 33000, end: 35000 },
  { text: "Eu sempre hei de cantar com ardor!", start: 36000, end: 39000 },
  { text: "Vaqueiro colossal,", start: 40000, end: 41000 },
  { text: "Figura imortal", start: 42000, end: 43000 },
  { text: "Guarapuava é teu grande amor!", start: 44000, end: 48000 },
  { text: "O Sol doura o campo verdejante", start: 49000, end: 52000 },
  { text: "A brisa, os trigais a balouçar", start: 53000, end: 56000 },
  { text: "Guarapuava é menina radiante", start: 57000, end: 62000 },
  { text: "Com o ouro dos trigais a se enfeitar!", start: 63000, end: 65000 },
  { text: "Com fervor, nós te saudamos, Guarapuava", start: 66000, end: 70000 },
  { text: "Neste hino de Louvor!", start: 71000, end: 75000 },
  { text: "Teu vulto sem igual", start: 76000, end: 77000 },
  { text: "Pinheiro magistral", start: 78000, end: 80000 },
  { text: "Eu sempre hei de cantar com ardor!", start: 81000, end: 84000 },
  { text: "Vaqueiro colossal,", start: 85000, end: 86000 },
  { text: "Figura imortal", start: 87000, end: 88000 },
  { text: "Guarapuava é teu grande amor!", start: 89000, end: 93000 },
];

function formatMillis(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function Hino() {
  const sound = useRef<Audio.Sound | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLine, setCurrentLine] = useState<number | null>(null);

  async function toggleAudio() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!sound.current) {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("../assets/audio/hino.mp3"),
          { shouldPlay: true }
        );
        sound.current = newSound;
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;
          setPosition(status.positionMillis);
          if (status.durationMillis) {
            setDuration(status.durationMillis);
          }
          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentLine(null);
            setPosition(0);
          }
        });
      } catch (e) {
        console.log("Erro ao carregar áudio do hino:", e);
      }
    } else {
      if (isPlaying) {
        await sound.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    }
  }

  useEffect(() => {
    if (!isPlaying) return;

    const lineIndex = lyrics.findIndex(
      (line) => position >= line.start && position <= line.end
    );

    if (lineIndex !== -1 && lineIndex !== currentLine) {
      setCurrentLine(lineIndex);
      scrollRef.current?.scrollTo({
        y: Math.max(0, lineIndex * 52 - 120),
        animated: true,
      });
    }
  }, [position, isPlaying]);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Hino Oficial de Guarapuava",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      />

      <View style={styles.responsiveWrapper}>
        
        {/* REPRODUTOR INSTITUCIONAL */}
        <View style={styles.playerDock}>
          <View style={styles.badgeRow}>
            <View style={styles.audioBadge}>
              <Text style={styles.audioBadgeText}>SÍMBOLO CÍVICO OFICIAL</Text>
            </View>
          </View>

          <Text style={styles.playerTitle}>Hino Municipal de Guarapuava</Text>
          <Text style={styles.playerCredits}>
            Letra: <Text style={styles.highlightCredit}>Gilda Todeschini</Text> • Música:{" "}
            <Text style={styles.highlightCredit}>Luiz Eulógio Zilli</Text>
          </Text>

          {/* BOTÃO PLAY / PAUSE */}
          <TouchableOpacity
            style={[styles.playButton, isPlaying && styles.pauseButton]}
            onPress={toggleAudio}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={18}
              color={isPlaying ? colors.text : colors.textDark}
              style={{ marginRight: 8 }}
            />
            <Text
              style={[
                styles.playButtonText,
                isPlaying && styles.pauseButtonText,
              ]}
            >
              {isPlaying ? "PAUSAR EXECUÇÃO" : "REPRODUZIR HINO"}
            </Text>
          </TouchableOpacity>

          {/* BARRA DE PROGRESSO */}
          <View style={styles.progressSection}>
            <View style={styles.trackBackground}>
              <View
                style={[styles.trackFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatMillis(position)}</Text>
              <Text style={styles.timeText}>
                {duration > 0 ? formatMillis(duration) : "01:33"}
              </Text>
            </View>
          </View>
        </View>

        {/* TELEPROMPTER / LETRA */}
        <View style={styles.lyricsSection}>
          <View style={styles.lyricsHeaderRow}>
            <Feather name="align-left" size={14} color={colors.gold} style={{ marginRight: 6 }} />
            <Text style={styles.lyricsHeaderText}>LETRA SINCRONIZADA</Text>
          </View>

          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.lyricsScrollContent}
          >
            {lyrics.map((line, index) => {
              const isActive = index === currentLine;
              return (
                <View
                  key={index}
                  style={[
                    styles.lyricRow,
                    isActive && styles.activeLyricRow,
                  ]}
                >
                  <Text
                    style={[
                      styles.lyricText,
                      isActive && styles.activeLyricText,
                    ]}
                  >
                    {line.text}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

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
    paddingHorizontal: colors.spacing.md,
    paddingTop: colors.spacing.sm,
  },
  playerDock: {
    backgroundColor: colors.card,
    padding: colors.spacing.md,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: colors.spacing.md,
  },
  badgeRow: {
    marginBottom: 6,
  },
  audioBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.goldLight,
    paddingHorizontal: colors.spacing.sm,
    paddingVertical: colors.spacing.xs,
    borderRadius: colors.radiusSm,
  },
  audioBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.goldBright,
    letterSpacing: 1.2,
  },
  playerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  playerCredits: {
    fontSize: 13.5,
    color: colors.textMuted,
    marginBottom: colors.spacing.md,
  },
  highlightCredit: {
    color: colors.text,
    fontWeight: "600",
  },
  playButton: {
    backgroundColor: colors.gold,
    minHeight: 48,
    borderRadius: colors.radius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: colors.spacing.md,
  },
  pauseButton: {
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  playButtonText: {
    color: colors.textDark,
    fontSize: 13.5,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  pauseButtonText: {
    color: colors.text,
  },
  progressSection: {
    gap: 4,
  },
  trackBackground: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  trackFill: {
    height: "100%",
    backgroundColor: colors.gold,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 11,
    color: colors.textSubtle,
    fontVariant: ["tabular-nums"],
  },

  /* LETRA */
  lyricsSection: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: colors.radius,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    padding: colors.spacing.md,
    marginBottom: colors.spacing.md,
  },
  lyricsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: colors.spacing.md,
    paddingBottom: colors.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorderSubtle,
  },
  lyricsHeaderText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gold,
    letterSpacing: 1.5,
  },
  lyricsScrollContent: {
    paddingVertical: colors.spacing.sm,
  },
  lyricRow: {
    paddingVertical: 10,
    paddingHorizontal: colors.spacing.sm,
    borderRadius: colors.radiusSm,
    marginBottom: 4,
  },
  activeLyricRow: {
    backgroundColor: "rgba(197, 160, 89, 0.12)",
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
  },
  lyricText: {
    fontSize: 15.5,
    color: colors.textSubtle,
    textAlign: "center",
    lineHeight: 23,
  },
  activeLyricText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16.5,
  },
});
