import React, { useState } from "react";
import { View, Text, Button} from "react-native";
import { WebView } from 'react-native-webview';

const VerificationPage = () => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [showWebView, setShowWebView] = useState(false);
    const [showTextAndButton, setShowTextAndButton] = useState(true);

    const verifyEmail = () => {
        setShowTextAndButton(false);
        setShowWebView(true);
    };

    const onNavigationStateChange = (navState) => {
        if (navState.url === 'https://moodle.bath.ac.uk/') {
            setIsEmailVerified(true);
            setShowWebView(false);
            setShowTextAndButton(true);
        }
    };

    return (
        <View style={{ flex: 1}}>
            {isEmailVerified ? (
            <Text>Email verified</Text>
            ) : (
            <>
                {showTextAndButton && (
                <>
                    <Text>Email is not verified</Text>
                    <Button title="Press to verify email" onPress={verifyEmail} />
                </>
                )}
                {showWebView && (
                    <WebView
                        source={{
                            uri: 'https://auth.bath.ac.uk/login?service=http%3A%2F%2Fmoodle.bath.ac.uk%2Flogin%2Findex.php%3Fauthldap_skipntlmsso%3D1',
                        }}
                        onNavigationStateChange={onNavigationStateChange}
                    />
                )}
            </>
        )}
        </View>
    );
}

export default VerificationPage;
