import React,  { Component }  from 'react';
import { StyleSheet, Text, View, Image, AppRegistry, Button, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, NetInfo, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Expo from 'expo';
import { MapView, Permissions, BarCodeScanner, SQLite, Location } from 'expo';
import { getDistance, getRhumbLineBearing, getBearing } from 'geolib';





const db = SQLite.openDatabase('db1234.db');
var isOnline = true;




class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
      <Image
        source={require('./spiro.png')}
        style={{ width: 30, height: 30, flex: 1, resizeMode: 'contain', alignSelf: 'center' }}
      />
      </View>
    );
  }
}

class GetLoc extends React.Component{
  state = {
    location: null,
    errorMessage: null,
    target: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      user: {
        latitude: 37,
        longitude: -122,
        trueHeading: 0,
        
      },
      mark: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    
  };

  componentWillMount() {
      Location.setApiKey('AIzaSyAIoKTYvCWftWH2xeV45o__y9Cj-jFIvCU');
      //this._getLocationAsync();
      this.doit();
      //this._getLocationAsync();
    
  }

  doit(){
    Location.watchPositionAsync({},this._getLocationAsync);
    Location.watchHeadingAsync(this._getLocationAsync);
     
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    /* this.state = ({
      target: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      user: {
        latitude: 37,
        longitude: -122,
        heading: {
          trueHeading: 0,
        }
      },
      mark: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    }) */

    //let location = await Location.getCurrentPositionAsync({});
    
    
    let location = await Location.getCurrentPositionAsync({});
    let usrlatitude = location.coords.latitude
    let usrlongitude = location.coords.longitude
    let usrheading = await Location.getHeadingAsync();
    usrheading = usrheading.trueHeading

    /* Location.watchHeadingAsync((lo) => {
      usrheading = lo.trueHeading
      });

      Location.watchPositionAsync({},(lo) => {
        usrlatitude = lo.latitude
        usrlongitude = lo.longitude
        }); 
 */
    this.setState({
      target: {
        latitude: 39.379626,
        longitude: 3.240804,
      },
      user: {
        latitude: usrlatitude,
        longitude: usrlongitude,
        heading: usrheading,
      },
      mark: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    })
   
    /*  Location.watchPositionAsync({},(lo) => {
      console.log(JSON.stringify(lo))
      this.setState({ lo })});  */
    //this.setState({ location });
    
    
  };

  render() {
    let text = 'Waiting..';
    let text2 = "";
    let deg = '0deg';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if(this.state.user != null){
      
      let trgpos = {latitude: this.state.target.latitude, longitude: this.state.target.longitude}
      let usrpos = {latitude: this.state.user.latitude, longitude: this.state.user.longitude}
      let direction = geolib.getRhumbLineBearing(usrpos, trgpos) //oder getBearing
      text = getDistance(usrpos, trgpos);
      text2 = direction;
      //console.log(text)
      //console.log(text2)
      deg = (-1 * (this.state.user.heading - direction)) + 'deg'
    }

    return (
      <View style={styles.container}>
        
        <Text style={styles.paragraph}>{deg}</Text>
        <Text style={styles.paragraph}>{text2}</Text>
        <Image
        source={require('./arrow.png')}
        style={{ transform: [{ rotate: deg}],  width: 50, height: 50, flex: 1, resizeMode: 'contain', alignSelf: 'center', paddingBottom: -100  }}
      />
      <Text style={{fontSize: 35, flex: 1, alignSelf: 'center'}}>{text}m</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  
  static navigationOptions = {
    
    headerTitle: <LogoTitle />,
    //headerTitleStyle: {flex: 1},
    headerLeft: (
      <Text></Text>
    ),
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color={Platform.OS === 'ios' ? "#fff" : "#f4511e"}
      />
    ),
  };
  render() {
    return (
      
      <View style={styles.container}>
      
       {<Image
          style={{width: '100%', height: '50%'}}
          source={require('./karsau.png')}
        />}
        
        <FlatList
          data={[
            {key: 'Über Karsau', togo: 'Static', content: 'History'},
            {key: 'Kontakt', togo: 'Static', content: 'Contact'},
            {key: 'Kartenansicht', togo: 'Static', content: 'Map'},
            {key: 'bcScanner', togo: 'Static', content: 'bc'},
            {key: 'Server', togo: 'Static', content: 'Server'},
            {key: 'SQL', togo: 'Static', content: 'SQL'},
            {key: 'Alex', togo: 'Static', content: 'Loc'},
            {key: 'EE'},
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

class BCarcodescanner extends React.Component{
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }
  _handleBarCodeRead = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
<Text>{}</Text>
</View>
    );
  }
}

function getMoviesFromApiAsync() {
  if(isOnline){
  try{
  return fetch("https://api.re-host.eu/api/testapi/all?limit=100000", {
    method: 'GET',
    headers: {
      'X-Api-Key': '05DA927B0DAFD5FF7FDC31EB2A20FBAF',
      'Limit': '1000'
    },
   
}).then((response) => {
  if(response.status === 200)
  return response.json()
  alert('This is a button!')
})
  .then((responseJson) => {

    return responseJson.data.testapi;
    

    

  })
  .catch((error) =>{
    console.error(error);
    throw Error(response.statusText)
  })
}catch(e){
  alert('This is a button!')
  console.log(e)
}
  }else{
    return null
  }
}

class Server extends React.Component{
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  /* componentDidMount(){
  return fetch("https://api.re-host.eu/api/testapi/all", {
    method: 'GET',
    headers: {
      'X-Api-Key': '05DA927B0DAFD5FF7FDC31EB2A20FBAF'
    },
   
}).then((response) => response.json())
  .then((responseJson) => {

    this.setState({
      isLoading: false,
      dataSource: getMoviesFromApiAsync(),
      //dataSource: responseJson.data.testapi,
    }, function(){

    });

  })
  .catch((error) =>{
    console.error(error);
  }); */
  componentDidMount(){
    var a = getMoviesFromApiAsync()
    return b = a.then((result) => {this.setState({
        isLoading: false,
        dataSource: result,
        //dataSource: responseJson.data.testapi,
      }, function(){
  
      })
    });
    }
    




render(){

if(this.state.isLoading){
  return(
    <View style={{flex: 1, padding: 20}}>
      <ActivityIndicator/>
    </View>
  )
}


return(
  <View style={styles.container}>
    <FlatList
      data={this.state.dataSource}
      renderItem={({item}) => <TouchableOpacity onPress={() => getMoviesFromApiAsync()}><Text style={styles.item}>{item.id}, {item.text1}</Text></TouchableOpacity>}
      keyExtractor={(item, index) =>  index.toString()}
    />
  </View>
);
}}

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



async function syncAPI() {
  /* db.transaction(tx => {
    tx.executeSql(
      'drop table itemas;'
    );
  }, null, null); */
  await db.transaction(tx => {
    tx.executeSql(
      'create table if not exists itemas (id integer primary key not null, text1 text, number1 int);'
    );
  }, null, null);
  if(isOnline){
  var a = getMoviesFromApiAsync()
  if(a != null && isOnline){
  await db.transaction(tx => {
    tx.executeSql(
      'delete from itemas;'
    );
  }, null, null);
   
   
    b = await a.then((result) => {
      result.map((item) => {( 
        //Hier wird durch das JSON Obkjekt, welches von der API abgerufen wird iteriert.
        //Dies geschieht um die Daten in die lokale SQLite Datenbank zu schreiben
        db.transaction(tx => {tx.executeSql('INSERT OR REPLACE into itemas (id, text1, number1) values (?, ?, ?)', [item.id, item.text1, item.number1])}, null, null)
       
      
      

      )
      
      })
      
      }
    )
    
  }
}
  };



class SqlTest extends React.Component{
  state = {
    items: null,
  };

  

  async componentDidMount(){
   var a = await syncAPI()
    db.transaction(tx => {
      tx.executeSql(
        `select * from itemas`,
        null,
        (_, { rows: { _array } }) => this.setState({ items: _array }, () => {})
      );
    })
  
  
    //this.update();
  }

  async update() {
    try{
    let value = await syncAPI()
    db.transaction(tx => {
      tx.executeSql(
        `select * from itemas`,
        null,
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
  catch(e){
    console.log('caught error', e);
        // Handle exceptions
  }
    //console.log(this.state)
  }
  render(){
  let { items } = this.state;
  if (items === null || items.length === 0) {
      this.update()
      return (
        <View style={{flex: 1, padding: '50%'}}>
      <ActivityIndicator size='large'/>
    </View>
      )
    
     
    }

    return (
     
      <View style={styles.container}>
    <FlatList
      data={this.state.items}
      
      renderItem={({item}) => (<TouchableOpacity onPress={() => this.update()}><Text style={styles.item}>{item.id}, {item.text1}</Text></TouchableOpacity>)}
      keyExtractor={(item, index) =>  index.toString()}
    />
  
      
      {/* <Button title='Test' onPress={() => this.update}>sdf</Button>
        {items.map(({ id, text1, number1 }) => (
        <TouchableOpacity
          key={id}
          style={{
            padding: 5,
            borderColor: 'black',
            borderWidth: 1,
          }}>
          <Text>{text1}</Text>
        </TouchableOpacity>
      ))} */}
      </View>
      
    );
  }

  

  }



class MapScreen extends React.Component{
  render(){
    return(
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}

        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
      case 'Map':
      return(
        <MapScreen/>
      )
      case 'bc':
      return(
        <BCarcodescanner/>
      )
      case 'Server':
      return(
        <Server/>
      )

      case 'SQL':
      return(
        <SqlTest/>
      )

      case 'Loc':
      return(
        <GetLoc/>
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
  componentDidMount() {

    
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    //syncAPI();
    
    /* db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, number int, value text);'
      );
    }); */
  }
  
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
      isOnline = true
      console.log("online")
    } else {
      this.setState({ isConnected });
      isOnline = false
      console.log("offline")
    }
  };
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
 }
  render() {
    return <RootStack />;
  }
}