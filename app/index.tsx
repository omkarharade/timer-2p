import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
export default function Index() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.clockOutline}>
				<View style={styles.playerOne}>
					<Text>Player 1</Text>
				</View>

				<View style={styles.playerTwo}>
					<Text>Player 2</Text>
				</View>
			</View>
		</SafeAreaView>
	);
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
		color: "#fff",
	},
	clockOutline: {
		flex: 1,
		width: "80%",
		height: "80%",
		borderColor: "black",
		borderWidth: 1,
		alignItems: "center",
	},
	playerOne: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "darkseagreen",
		alignItems: "center",
		width: "100%",
	},
	playerTwo: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "slateblue",
		width: "100%",
		alignItems: "center",
	},
});
