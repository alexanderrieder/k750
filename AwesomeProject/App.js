import React,  { Component }  from 'react';
import { StyleSheet, Text, View, AppRegistry, Image, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./spiro.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}
class HomeScreen extends React.Component {
  
  static navigationOptions = {
    
    headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  };
  render() {
    return (
      
      <View style={styles.container}>
       <Image
          style={{width: '100%', height: '50%'}}
          source={require('./karsau.png')}
        />
        <FlatList
          data={[
            {key: 'Über Karsau', togo: 'Static', content: 'History'},
            {key: 'Kontakt', togo: 'Static', content: 'Contact'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <TouchableOpacity onPress={() =>
            this.props.navigation.push(item.togo, {
              itemId: '33', title: item.key, content: item.content},
            )}
            ><Text style={styles.item}>{item.key}</Text></TouchableOpacity>}
        />
      </View>
    );
  }
}

class Contact extends React.Component{
  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.contacttext}>Ortsvorsteher</Text>
        <Text style={styles.contacttext}>Herr Jürgen Räuber</Text>
        <Text style={styles.contacttext}>j.raeuber@rheinfelden-baden.de</Text>
        <Text style={styles.contacttext}>Tel.:    07623 - 5151</Text>
        <Text style={{paddingVertical: 20}}></Text>
<Text style={styles.contacttext}>Webmaster</Text>
<Text style={styles.contacttext}>Herr Herbert Herzog</Text>
<Text style={styles.contacttext}>webmaster@karsau-750.de</Text>
<Text style={styles.contacttext}>Tel.: +49 7623 50991</Text>
<Text style={styles.contacttext}>Mobil: +49 1520 17 96 007</Text>
</View>
    );
  }
}

class History extends React.Component{
  render(){
    return(
      <ScrollView>
    <Text style={styles.longtext}>Karsau bildete mit Riedmatt und Beuggen einst ein geschlossenes Territorium
    der 1246 gegründeten Deutschordenskommende Beuggen. Beuggen wird
    erstmals 1218 als „Bugheim“ erwähnt,
    und im Jahr 1269 folgen die urkundlichen Nennungen von Karsau als „Karlesouwe“
    und von Riedmatt als „zu Rietmatten“.
    
    Karsau selbst liegt am südlichen Hang des Dinkelberges. Riedmatt dagegen
    in einer zum Rhein hin verlaufenden Talmulde. Westlich davon schließt
    sich Beuggen mit seiner Mitte des 13. Jahrhunderts erbauten, mächtigen Burganlage
    des Deutschordenschlosses an.
    Die Grundherren hatten die Grund- und Leibherrschaft, die niedere und seit 1739 auch
    die hohe Gerichtsbarkeit über die Untertanen.
    Der Komtur Beuggens war Mitglied des Prälatenstandes in Vorderösterreich.</Text>
    <View style={{padding: 15}}>
    <View>
    <Image 
    style={{width: '100%'}}
    source={require('./postkarte.jpg')}
    />
    <Text style={{paddingTop: 5}}>Karsauer Ansichtskarte um 1915</Text>
    </View>
    </View>
    <Text style={styles.longtext}>Im Jahr 1806 kam die Deutschordenskommende in den Besitz des Großherzogs von Baden. Die Schlossanlage wurde im Lauf der Jahrhunderte verschiedentlich genutzt und wechselte auch mehrmals den Besitzer. Ab 1954 gehörte sie der evangelischen Landeskirche und wurde zuletzt als Tagungsstätte genutzt. Ende 2016 wechselte wiederum der Besitzer.</Text>
    </ScrollView>
    );
  }
}


class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
    }
  };
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
    title="Update the title"
    onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
  />
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class StaticTextScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.title : 'Static Text Screen',
    }
  };
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    const displayContent = navigation.getParam('content', );
    switch (displayContent) {
      case 'History':
      return(
        <History/>
      );
      case 'Contact':
      return(
        <Contact/>
      )



      default:
        return (
          <View style={styles.lvl2}>
            <Text>Null</Text>
          </View>
          );
    }
    
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Static: StaticTextScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  longtext: {
    padding: 10,
    fontSize: 18,
    
  },
  contacttext: {
    fontSize: 18,
    
  },
})

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}