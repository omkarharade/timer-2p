import {
	Alert,
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import {
	useFonts,
	PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Index() {
	let [fontsLoaded] = useFonts({
		PressStart2P_400Regular,
	});

	const initialTime: number = 600;
	const [playerTime1, setPlayerTime1] = useState<number>(initialTime);
	const [playerTime2, setPlayerTime2] = useState<number>(initialTime);

	const [isTimeRunningP1, setIsTimeRunningP1] = useState<Boolean>(false);
	const [isTimeRunningP2, setIsTimeRunningP2] = useState<Boolean>(false);

	const [activeTurnP1, setActiveTurnP1] = useState<Boolean | null>(null);

	useEffect(() => {
		if (playerTime1 === 0 || playerTime2 === 0) {
			setIsTimeRunningP1(false);
			setIsTimeRunningP2(false);
			setActiveTurnP1(null);
		}
		let intervalId: any;
		if (isTimeRunningP1) {
			// setting time from 0 to 1 every 1 second using javascript setInterval method
			intervalId = setInterval(
				() => setPlayerTime1((currentTime) => currentTime - 1),
				1000
			);
		} else if (isTimeRunningP2) {
			intervalId = setInterval(
				() => setPlayerTime2((currentTime) => currentTime - 1),
				1000
			);
		} else {
			clearInterval(intervalId);
		}
		return () => clearInterval(intervalId);
	}, [isTimeRunningP1, isTimeRunningP2, playerTime1, playerTime2]);

	// function to format time from seconds to MM : SS format

	let formatTime = function (playerTime: number): string {
		let playerMinutes = Math.floor(playerTime / 60);
		let playerSeconds = playerTime % 60;

		return `${playerMinutes < 10 ? "0" : ""}${playerMinutes} : ${
			playerSeconds < 10 ? "0" : ""
		}${playerSeconds} `;
	};

	const onPlayBtnPress = () => {
		if (activeTurnP1 === null) {
			setActiveTurnP1(true);
			setIsTimeRunningP1(true);
			setActiveTurnP1(true);
		} else if (activeTurnP1) {
			setIsTimeRunningP1(true);
			setActiveTurnP1(true);
		} else {
			setIsTimeRunningP2(true);
			setActiveTurnP1(false);
		}
	};

	const onPauseBtnPress = () => {
		if (activeTurnP1) {
			setIsTimeRunningP1(false);
		} else {
			setIsTimeRunningP2(false);
		}
	};

	const onResetBtnPress = () => {
		setActiveTurnP1(null);
		setIsTimeRunningP1(false);
		setIsTimeRunningP2(false);

		setPlayerTime1(initialTime);
		setPlayerTime2(initialTime);
	};

	const onClockPress = (player: string) => {
		if (!isTimeRunningP1 && !isTimeRunningP2) return;

		if (activeTurnP1 && player === "player1") {
			setPlayerTime1((prevTime) => prevTime + 5);
			setIsTimeRunningP1(false);
			setIsTimeRunningP2(true);
			setActiveTurnP1(false);
		} else if (activeTurnP1 === false && player === "player2") {
			setPlayerTime2((prevTime) => prevTime + 5);
			setIsTimeRunningP1(true);
			setIsTimeRunningP2(false);
			setActiveTurnP1(true);
		}
	};

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.clockOutline}>
					{/* player 1 area */}
					<TouchableHighlight
						onPress={() => {
							onClockPress("player1");
						}}
						style={[
							styles.playerOne,
							activeTurnP1 && activeTurnP1 ? styles.active : styles.inactive,
						]}
					>
						<Text style={styles.text}>{formatTime(playerTime1)}</Text>
					</TouchableHighlight>

					{/* control panel */}

					<View style={styles.controls}>
						{isTimeRunningP1 || isTimeRunningP2 ? (
							<TouchableHighlight onPress={onPauseBtnPress}>
								<FontAwesome5 name="pause" size={45} color="orange" />
							</TouchableHighlight>
						) : (
							<TouchableHighlight onPress={onPlayBtnPress}>
								<FontAwesome name="play" size={45} color="greenyellow" />
							</TouchableHighlight>
						)}
						<TouchableHighlight onPress={onResetBtnPress}>
							<FontAwesome name="rotate-left" size={45} color="hotpink" />
						</TouchableHighlight>
					</View>

					{/* player 2 area */}
					<TouchableHighlight
						style={[
							styles.playerTwo,
							activeTurnP1 === false ? styles.active : styles.inactive,
						]}
						onPress={() => {
							onClockPress("player2");
						}}
					>
						<Text style={styles.text}>{formatTime(playerTime2)}</Text>
					</TouchableHighlight>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: "white",
		alignItems: "center",
	},
	text: {
		// Note the quoting of the value for `fontFamily` here; it expects a string!
		fontFamily: "PressStart2P_400Regular",
		fontSize: 30,
		paddingVertical: 6,
	},
	clockOutline: {
		flex: 1,
		width: "100%",
		height: "100%",
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "indigo",
	},
	playerOne: {
		flex: 5,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		borderRadius: 15,
		marginTop: 10,
		marginBottom: 10,
	},
	playerTwo: {
		flex: 5,
		justifyContent: "center",
		// backgroundColor: "slateblue",
		width: "100%",
		alignItems: "center",
		borderRadius: 15,
		marginTop: 10,
		marginBottom: 10,
	},

	inactive: {
		backgroundColor: "steelblue",
	},

	active: {
		backgroundColor: "palegoldenrod",
	},

	controls: {
		flexDirection: "row",
		backgroundColor: "black",
		flex: 1,
		width: "100%",
		borderRadius: 20,
		justifyContent: "space-evenly",
		alignItems: "center",
	},

	iconsLayout: {},
});
