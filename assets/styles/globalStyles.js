import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // fontFamily: "Poppin"
    },
    heroContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    heroBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
    },
    heroContent: {
        position: "relative",
        zIndex: 2,
        color: "white",
        paddingVertical: 120,
        paddingHorizontal: 20,
        backgroundColor: "#1C1A5E",
    },
    topTextContainer: {
        alignItems: 'center'
    },
    topText: {
        color: 'white',
        fontSize: 46,
        fontWeight: "800",
    },
    subText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "500",
        marginTop: 60
    },
    buttonContainer: {
        marginTop: 220,
    },
    getStartedButton: {
        backgroundColor: "lightblue",
        padding: 4
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50
    },
    loginText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 16,
        position: 'relative',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20
    },
    footerText: {
        color: 'white',
        textAlign: 'center',
    },
    footerActionText: {
        fontWeight: 'bold',
        color: 'lightblue',
    },
    buttonLabel: {
        color: 'black',
        fontSize: 14,
        fontWeight: "bold"
    },
    animationContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: -150,
        marginRight: -50,
        padding: 10,
        alignItems: 'center',
    },
    loginText: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    form: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 16,
        position: 'relative',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 12,
        // borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 50
    },
    singupBackgroundAnimationContainer: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        alignItems: 'center',
        alignSelf: "center",
        zIndex: -1
    },
   
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 50
    },
    singupBackgroundAnimationContainer: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        alignItems: 'center',
        alignSelf: "center",
        zIndex: -1
    },

   
    loginContainer: {
        backgroundColor: "#1C1A5E",
        // padding: 20,
        borderRadius: 20,
        marginTop: 100,
        height: "100%"
    },
    loginFieldsContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        height: "100%",
        width: "100%"
    }
});
