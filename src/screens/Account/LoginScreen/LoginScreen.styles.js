import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
    image: {
        resizeMode: "contain",
        width: "100%",
        height: 150,
        marginTop: 20
    },

    content: {
        marginRight: 40,
        marginHorizontal: 40,
    },

    contentText: {
        flex: 1,
        alignItems: "center",
        marginTop: 15,
        marginBottom: 15,
    },

    googleButton: {
        backgroundColor: "#4285F4", // Color azul de Google
        borderRadius: 4,
      },

    textRegister: {
        marginTop: 15,
        marginHorizontal: 10,
    },

    contentBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    btnContainer: {
        width: "95%",
    },

    btnRegister: {
        color: "#00a680",
        fontWeight: "bold",
    }

})