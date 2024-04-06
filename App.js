import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Pressable, TouchableOpacity, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';

// Create Bottom Tab Navigator
const BottomTab = createBottomTabNavigator();

// Create Material Top Tab Navigator
const TopTab = createMaterialTopTabNavigator();

// Screens for the Top Tab inside Bottom Tab's second screen
const TopScreen1 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 1</Text>
  </View>
);

const TopScreen2 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 2</Text>
  </View>
);

const TopScreen3 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 3</Text>
  </View>
);

const TopScreen4 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 4</Text>
  </View>
);

const TopScreen5 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 5</Text>
  </View>
);

const TopScreen6 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 6</Text>
  </View>
);
const TopScreen7 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 7</Text>
  </View>
);

const TopScreen8 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 8</Text>
  </View>
);

const TopScreen9 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Top Tab 9</Text>
  </View>
);

// Screens for Bottom Tab Navigator

const FirstScreen = () => {
  const tabs = ['Zero', 'First', 'Second', 'Third', 'Fourth'];
  const [activeTab, setActiveTab] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const pagerRef = useRef(null);

  const handlePageScroll = (e) => {
    const { position, offset } = e.nativeEvent;
    const currentIndex = Math.round(position + offset);
    setActiveTab(currentIndex);
  };

  const animatedValue = useRef(new Animated.Value(activeTab)).current;

  const onTabSelect = (index) => {
    setActiveTab(index);
    if (pagerRef.current) {
      pagerRef.current.setPage(index);
    }
  };

  // Smooth animation when transitioning between tabs
  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: activeTab,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  return (
    <View style={{ flex: 1 }}>
      <TabBar tabs={tabs} activeTab={activeTab} onPress={onTabSelect} animatedValue={animatedValue} />
      <PagerView
        style={{ flex: 1 }}
        ref={pagerRef}
        initialPage={activeTab}
        onPageScroll={handlePageScroll}
        onPageLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
      >
        {tabs.map((item, index) => (
          <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{item} page</Text>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const TabBar = ({ tabs, activeTab, onPress, animatedValue }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#ccc', paddingVertical: 10 }}>
      {tabs.map((tab, index) => {
        const opacity = animatedValue.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              alignItems: 'center',
              borderBottomWidth: 2,
              borderColor: activeTab === index ? 'red' : '#fff',
              marginHorizontal: 2,
              opacity,
            }}
            onPress={() => onPress(index)}
          >
            <Text style={{ fontWeight: activeTab === index ? 'bold' : 'normal' }}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};




const SecondScreen = () => (
  <TopTab.Navigator tabBarOptions={{
    scrollEnabled: true,
    tabStyle: { width: 100 },
  }}>
    <TopTab.Screen name="Top1" component={TopScreen1} />
    <TopTab.Screen name="Top2" component={TopScreen2} />
    <TopTab.Screen name="Top3" component={TopScreen3} />
    <TopTab.Screen name="Top4" component={TopScreen4} />
    <TopTab.Screen name="Top5" component={TopScreen5} />
    <TopTab.Screen name="Top6" component={TopScreen6} />
    <TopTab.Screen name="Top7" component={TopScreen7} />
    <TopTab.Screen name="Top8" component={TopScreen8} />
    <TopTab.Screen name="Top9" component={TopScreen9} />
  </TopTab.Navigator>
);

const ThirdScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Third Screen</Text>
  </View>
);

const FourthScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Fourth Screen</Text>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="First" component={FirstScreen} />
        <BottomTab.Screen name="Second" component={SecondScreen} />
        <BottomTab.Screen name="Third" component={ThirdScreen} />
        <BottomTab.Screen name="Fourth" component={FourthScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;

