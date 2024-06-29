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
        backgroundColor: "#3b5998",
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
        backgroundColor: "#D8BFD8",
        padding: 4,
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
        color: '#D8BFD8',
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
        backgroundColor: "#3b5998",
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
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#fe3c72',
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

    // User profile
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        padding: 20,
        alignItems: 'center',
    },
    iconTouchable: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeStyle: {
        position: 'absolute',
        right: -6,
        top: -3,
        zIndex: 1,
        backgroundColor: "red"
    },
    rectangleBox: {
        backgroundColor: '#3b5998',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 15
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 14,
    },
    contentLayout: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageHome: {
        width: 100,
        height: 100,
        marginLeft: 20,
    },
    servicesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    serviceTitle: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: -8
    },
    serviceImg: {
        width: 110,
        height: 100,
        borderRadius: 10,
        marginBottom: 8
    },
    seeAllServices: {
        marginBottom: 5
    },
    circle: {
        borderRadius: 30,
        width: 70,
        height: 70
    },
});
