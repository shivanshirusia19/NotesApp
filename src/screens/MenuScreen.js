import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {getNotes} from '../services/Home/action';
class MenuScreen extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.props.getNotes(this.props.userId);
    }
  }

  renderCategoryList = () => {
    const dark = this.props.themeDark;
    const categories = {};
    let lastNoteTitle;
    if (this.props.notes) {
      lastNoteTitle = this.props.notes[this.props.notes.length - 1];
    }
    this.props.notes &&
      this.props.notes.map((item) => {
        const title = item.title;
        if (categories.hasOwnProperty(item.title)) {
          categories[title] += 1;
        } else {
          categories[title] = 1;
        }
      });

    const viewNotes = (Title, Count) => {
      this.props.navigation.navigate('NotesScreen', {
        Title,
        Count,
      });
    };

    return Object.entries(categories).map((item, index) => {
      let activeTitle = lastNoteTitle.title === item[0];
      return (
        <TouchableOpacity
          onPress={() => viewNotes(item[0], item[1])}
          style={styles.categoryView}
          key={index}>
          <Text
            style={[
              styles.categoryTitle,
              dark && darkTheme.categoryTitle,
              activeTitle && styles.activeCountTitle,
              dark && activeTitle && darkTheme.colorRed,
            ]}>
            {item[0]}
          </Text>
          <View
            style={[
              styles.countView,
              activeTitle && styles.activeCountView,
              dark && activeTitle && darkTheme.countView,
            ]}>
            <Text
              style={[
                styles.categoryCount,
                dark && darkTheme.categoryCount,
                activeTitle && styles.activeCountText,
                dark && activeTitle && darkTheme.colorRed,
              ]}>
              {item[1]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const dark = this.props.themeDark;
    return (
      <View style={[styles.container, dark && darkTheme.container]}>
        <Text style={styles.title}>
          <Text style={dark && darkTheme.colorRed}>My </Text>
          <Text style={[styles.colorBlue, dark && darkTheme.heading]}>
            Notes
          </Text>
        </Text>
        <ScrollView>{this.renderCategoryList()}</ScrollView>
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              style={[styles.menuIcon, dark && darkTheme.menuIconDark]}
              source={require('../assets/menuIcon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => this.props.navigation.navigate('AddNoteScreen')}>
            <Image
              style={styles.addIcon}
              source={require('../assets/addIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#E62D1D',
    letterSpacing: 1.5,
    marginBottom: 30,
  },
  colorBlue: {
    color: '#383972',
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryTitle: {
    fontSize: 32,
    color: '#383972',
    fontWeight: 'bold',
  },
  categoryCount: {
    fontSize: 32,
    color: '#383972',
    fontWeight: 'bold',
  },
  countView: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCountView: {
    backgroundColor: 'rgba(230,45,29, 0.15)',
    borderRadius: 25,
  },
  activeCountText: {
    color: '#E62D1D',
  },
  activeCountTitle: {
    color: '#E62D1D',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    margin: 10,
    height: 35,
    width: 35,
  },
  addIconContainer: {
    margin: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    height: 50,
    width: 50,
    tintColor: 'white',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
  },
  heading: {
    color: 'white',
  },
  categoryTitle: {
    color: 'white',
  },
  categoryCount: {
    color: 'white',
  },
  colorRed: {
    color: '#ed5b4e',
  },
  countView: {
    backgroundColor: 'rgba(237, 91, 78, 0.25)',
  },
  menuIconDark: {
    tintColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  userId: state.login.userId,
  notes: state.home.notes,
  themeDark: state.home.themeDark,
});

const mapDispatchToProps = (dispatch) => ({
  getNotes: (value) => dispatch(getNotes(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
