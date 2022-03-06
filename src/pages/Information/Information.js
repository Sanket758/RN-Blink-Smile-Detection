import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Voice from '@react-native-community/voice';
import {ScrollView} from 'react-native-gesture-handler';
import BackgroundService from 'react-native-background-actions';

const Information = () => {
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(result);
        await sleep(delay);
      }
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'Touchless',
    taskDesc: 'Voice Recording',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 2000,
    },
  };

  const backgroundServiceStart = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const b = async () => {
    await BackgroundService.updateNotification({
      taskDesc: 'Voice Recording',
    });
  };

  const c = async () => {
    await BackgroundService.stop();
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
    console.log('start handler==>>>', e);
    backgroundServiceStart();
  };

  const onSpeechEndHandler = e => {
    //  setLoading(false);
    console.log('stop handler', e);
    if (
      result.includes('open') ||
      result.includes('youtube') ||
      result.includes('start')
    ) {
      clickHandler();
    }
  };

  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
    console.log('speech result handler', e);
    console.log(text);
    if (
      text.includes('open') ||
      text.includes('youtube') ||
      text.includes('start')
    ) {
      clickHandler();
    }
    startRecording();
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const stopRecording = async () => {
    try {
      // await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const clickHandler = () => {
    Linking.openURL('https://www.youtube.com/');
    scrollViewRef.current.scrollToEnd({animated: true});
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="your text"
            style={{flex: 1}}
            onChangeText={text => setResult(text)}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{
                  uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
                }}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 4,
          }}
          onPress={stopRecording}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'blue',
            padding: 8,
            borderRadius: 4,
          }}
          onPress={clickHandler}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>click</Text>
        </TouchableOpacity>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <Text style={styles.headingText}>Speech Recoginition</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    overflow: 'scroll',
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
});

export default Information;
