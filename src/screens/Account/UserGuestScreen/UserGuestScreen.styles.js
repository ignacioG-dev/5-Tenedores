import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30,
    },

    image: {
        resizeMode: "contain",
        height: 300,
        width: "100%",
        marginBottom: 40,
    },

    title: {
        fontWeight: "bold",
        fontSize: 19,
        textAlign: "center",
        marginBottom: 10, 
    },

    description: {
        textAlign: "center",
        marginBottom: 20,
    },

    btnStyle: {
        backgroundColor: "#00a680",
    }
});

