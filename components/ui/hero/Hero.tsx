import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const images = [
  require('@/assets/images/screensHero/pantalla_1.png'),
  require('@/assets/images/screensHero/pantalla_2.png'),
  require('@/assets/images/screensHero/pantalla_3.png'),
];

const Hero = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      if (currentIndex === 0) {
        scrollViewRef.current.scrollTo({ x: images.length * viewportWidth, animated: false });
        setCurrentIndex(images.length);
      } else if (currentIndex === images.length + 1) {
        scrollViewRef.current.scrollTo({ x: viewportWidth, animated: false });
        setCurrentIndex(1);
      } else {
        scrollViewRef.current.scrollTo({ x: currentIndex * viewportWidth, animated: true });
      }
    }
  }, [currentIndex]);

  const handleScrollEnd = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / viewportWidth);

    if (scrollViewRef.current) {
      if (newIndex === 0) {
        scrollViewRef.current.scrollTo({ x: images.length * viewportWidth, animated: false });
        setCurrentIndex(images.length);
      } else if (newIndex === images.length + 1) {
        scrollViewRef.current.scrollTo({ x: viewportWidth, animated: false });
        setCurrentIndex(1);
      } else {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {extendedImages.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7FC',
  },
  slide: {
    width: viewportWidth,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 2,
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: 15,
  },
});

export default Hero;