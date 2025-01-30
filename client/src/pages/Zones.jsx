import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS

const Map = () => {
  // Dummy wildlife data with animal locations and emojis
  const wildlifeData = [
    { "animal": "Lion", "location": [-1.2921, 36.8219], "emoji": "🦁" },
    { "animal": "Crocodile", "location": [-25.7461, 28.1881], "emoji": "🐊" },
    { "animal": "Elephant", "location": [-2.5458, 23.8997], "emoji": "🐘" },
    { "animal": "Tiger", "location": [20.5937, 78.9629], "emoji": "🐅" },
    { "animal": "Panda", "location": [30.5852, 114.3388], "emoji": "🐼" },
    { "animal": "Giraffe", "location": [-1.2921, 36.8219], "emoji": "🦒" },
    { "animal": "Kangaroo", "location": [-33.8688, 151.2093], "emoji": "🦘" },
    { "animal": "Polar Bear", "location": [64.1995, -148.1623], "emoji": "🐻‍❄" },
    { "animal": "Penguin", "location": [-64.7807, -64.5091], "emoji": "🐧" },
    { "animal": "Koala", "location": [-33.8668, 151.2093], "emoji": "🐨" },
    { "animal": "Zebra", "location": [-1.2921, 36.8219], "emoji": "🦓" },
    { "animal": "Leopard", "location": [13.1121, 39.2560], "emoji": "🐆" },
    { "animal": "Rhinoceros", "location": [-1.2921, 36.8219], "emoji": "🦏" },
    { "animal": "Cheetah", "location": [2.2860, 36.7495], "emoji": "🐆" },
    { "animal": "Bison", "location": [39.5501, -105.7821], "emoji": "🐂" },
    { "animal": "Buffalo", "location": [8.9810, 38.7578], "emoji": "🐃" },
    { "animal": "Camel", "location": [23.6345, -102.5528], "emoji": "🦙" },
    { "animal": "Elephant Seal", "location": [-31.9505, 115.8605], "emoji": "🐘🦭" },
    { "animal": "Bat", "location": [19.0760, 72.8777], "emoji": "🦇" },
    { "animal": "Wolf", "location": [54.5260, 15.2551], "emoji": "🐺" },
    { "animal": "Fox", "location": [56.2639, 9.5018], "emoji": "🦊" },
    { "animal": "Hippopotamus", "location": [-20.7923, 34.0730], "emoji": "🦛" },
    { "animal": "Raccoon", "location": [37.0902, -95.7129], "emoji": "🦝" },
    { "animal": "Otter", "location": [41.8781, -87.6298], "emoji": "🦦" },
    { "animal": "Monkey", "location": [6.9271, 79.8612], "emoji": "🐒" },
    { "animal": "Sloth", "location": [9.1405, -83.7534], "emoji": "🦥" },
    { "animal": "Gorilla", "location": [1.3733, 32.2903], "emoji": "🦍" },
    { "animal": "Chimpanzee", "location": [2.0353, 9.3031], "emoji": "🐒" },
    { "animal": "Shark", "location": [20.5937, 78.9629], "emoji": "🦈" },
    { "animal": "Whale", "location": [56.1304, -106.3468], "emoji": "🐋" },
    { "animal": "Dolphin", "location": [27.4679, -81.4770], "emoji": "🐬" },
    { "animal": "Starfish", "location": [20.6536, -71.1952], "emoji": "⭐" },
    { "animal": "Seahorse", "location": [18.1105, -77.2975], "emoji": "🐴" },
    { "animal": "Shrew", "location": [56.5260, -69.1390], "emoji": "🐀" },
    { "animal": "Arctic Fox", "location": [69.3283, -52.0473], "emoji": "🦊" },
    { "animal": "Jaguar", "location": [16.5000, -86.1491], "emoji": "🐆" },
    { "animal": "Tortoise", "location": [-19.0198, 29.0588], "emoji": "🐢" },
    { "animal": "Alligator", "location": [27.9949, -81.7603], "emoji": "🐊" },
    { "animal": "Peacock", "location": [20.5937, 78.9629], "emoji": "🦚" },
    { "animal": "Red Panda", "location": [29.6569, 95.2387], "emoji": "🦝" },
    { "animal": "Tasmanian Devil", "location": [-42.8592, 147.2553], "emoji": "🐯" },
    { "animal": "Komodo Dragon", "location": [-8.74, 119.17], "emoji": "🐉" },
    { "animal": "Gibbon", "location": [13.737, 100.536], "emoji": "🦧" },
    { "animal": "Grizzly Bear", "location": [60.148, -159.3908], "emoji": "🐻" },
    { "animal": "Mantis Shrimp", "location": [-14.668, 135.5], "emoji": "🦐" },
    { "animal": "Leopard Seal", "location": [-69.1372, 39.6932], "emoji": "🐆🦭" },
    { "animal": "Wildebeest", "location": [-1.2921, 36.8219], "emoji": "🦌" },
    { "animal": "Giant Anteater", "location": [-23.5505, -46.6333], "emoji": "🐜" },
    { "animal": "Puffin", "location": [63.4158, -19.0996], "emoji": "🐦" },
    { "animal": "Iguana", "location": [13.0582, -61.7444], "emoji": "🦎" },
    { "animal": "Snake", "location": [10.4515, 8.5677], "emoji": "🐍" },
    { "animal": "Toucan", "location": [4.5709, -74.2973], "emoji": "🦜" },
    { "animal": "Tarantula", "location": [-23.9695, -57.6719], "emoji": "🕷" },
    { "animal": "Wallaby", "location": [-35.2835, 149.1280], "emoji": "🦘" },
    { "animal": "Sloth Bear", "location": [20.5937, 78.9629], "emoji": "🐻" },
    { "animal": "Numbat", "location": [-31.9505, 115.8605], "emoji": "🦝" },
    { "animal": "Bald Eagle", "location": [37.0902, -95.7129], "emoji": "🦅" },
    { "animal": "Great White Shark", "location": [-34.9188, 138.6067], "emoji": "🦈" },
    { "animal": "Marmot", "location": [47.0000, -105.0000], "emoji": "🦫" },
    { "animal": "Mandrill", "location": [3.7263, 11.6710], "emoji": "🦍" },
    { "animal": "Owl", "location": [40.7306, -73.9352], "emoji": "🦉" },
    { "animal": "Vulture", "location": [20.0000, 12.0000], "emoji": "🦅" },
    { "animal": "Wolverine", "location": [65.8560, 100.5104], "emoji": "🦊" },
    { "animal": "Peafowl", "location": [19.9014, 85.7989], "emoji": "🦚" },
    { "animal": "Lynx", "location": [62.7035, 20.6900], "emoji": "🐱" },
    { "animal": "Kakapo", "location": [-44.7579, 169.4467], "emoji": "🐦" },
    { "animal": "Capybara", "location": [-22.0000, -49.0000], "emoji": "🐹" },
    { "animal": "Albatross", "location": [-45.8350, 170.4210], "emoji": "🐦" },
    { "animal": "Hummingbird", "location": [11.5195, -69.9384], "emoji": "🐦" },
    { "animal": "Coyote", "location": [34.0522, -118.2437], "emoji": "🐺" },
    { "animal": "Whale Shark", "location": [-22.5497, 142.1029], "emoji": "🦈" },
    { "animal": "Pronghorn", "location": [42.2226, -111.0000], "emoji": "🦌" },
    { "animal": "Caribou", "location": [65.0000, -100.0000], "emoji": "🦌" },
    { "animal": "Mako Shark", "location": [-32.0000, 155.0000], "emoji": "🦈" },
    { "animal": "Nurse Shark", "location": [-16.1770, 144.3317], "emoji": "🦈" },
     { "animal": "Anaconda", "location": [-4.2117, -66.8703], "emoji": "🐍" },
  { "animal": "Brown Bear", "location": [61.0440, -150.7650], "emoji": "🐻" },
  { "animal": "Red Fox", "location": [56.2639, 9.5018], "emoji": "🦊" },
  { "animal": "Armadillo", "location": [31.9686, -99.9018], "emoji": "🦔" },
  { "animal": "Fennec Fox", "location": [23.4162, 25.6628], "emoji": "🦊" },
  { "animal": "Moose", "location": [64.2008, -149.4937], "emoji": "🐂" },
  { "animal": "Beaver", "location": [53.5444, -113.4909], "emoji": "🦫" },
  { "animal": "Hyena", "location": [-1.2921, 36.8219], "emoji": "🦝" },
  { "animal": "Elephant Bird", "location": [-13.1625, 40.1894], "emoji": "🐦" },
  { "animal": "Stingray", "location": [18.5559, 73.8753], "emoji": "🦈" },
  { "animal": "Arctic Hare", "location": [71.7005, -72.2040], "emoji": "🐇" },
  { "animal": "Bengal Tiger", "location": [20.5937, 78.9629], "emoji": "🐅" },
  { "animal": "Aye-Aye", "location": [-18.7669, 46.8691], "emoji": "🐒" },
  { "animal": "Andean Condor", "location": [-31.6204, -68.8245], "emoji": "🦅" },
  { "animal": "Okapi", "location": [0.6138, 29.4585], "emoji": "🦒" },
  { "animal": "Sea Otter", "location": [59.3816, -139.4926], "emoji": "🦦" },
  { "animal": "Ibex", "location": [47.3702, 9.2017], "emoji": "🐐" },
  { "animal": "Pangolin", "location": [4.7487, 19.5729], "emoji": "🦔" },
  { "animal": "Springbok", "location": [-29.1500, 24.7669], "emoji": "🦌" },
  { "animal": "Macaw", "location": [-0.8333, -78.1833], "emoji": "🦜" },
  { "animal": "Sand Cat", "location": [30.8025, 19.9675], "emoji": "🐱" },
  { "animal": "Axolotl", "location": [19.4326, -99.1332], "emoji": "🐸" },
  { "animal": "Mountain Gorilla", "location": [1.3733, 32.2903], "emoji": "🦍" },
  { "animal": "Jaguarundi", "location": [23.7794, -102.7236], "emoji": "🐱" },
  { "animal": "Chilean Flamingo", "location": [-33.46, -70.65], "emoji": "🦩" },
  { "animal": "Giant Tortoise", "location": [-0.7667, -90.6167], "emoji": "🐢" },
  { "animal": "Binturong", "location": [7.0051, 113.3030], "emoji": "🦝" },
  { "animal": "Bushbaby", "location": [-13.5867, 28.0773], "emoji": "🐒" },
  { "animal": "Brown Hyena", "location": [-24.5000, 25.3000], "emoji": "🦝" },
  { "animal": "Ocelot", "location": [14.1537, -87.7169], "emoji": "🐆" },
  { "animal": "Mole", "location": [50.8503, 4.3517], "emoji": "🐭" },
  { "animal": "Fruit Bat", "location": [4.4281, 7.8667], "emoji": "🦇" },
  { "animal": "Eagle", "location": [35.6528, 139.8395], "emoji": "🦅" },
  { "animal": "Spoonbill", "location": [15.0471, 74.3409], "emoji": "🦩" },
  { "animal": "Tarsier", "location": [13.4141, 122.5566], "emoji": "🐒" },
  { "animal": "Emu", "location": [-25.2769, 133.7751], "emoji": "🦣" },
  { "animal": "Great Horned Owl", "location": [34.0708, -118.4053], "emoji": "🦉" },
  { "animal": "Guanaco", "location": [-33.0472, -70.5957], "emoji": "🐐" },
  { "animal": "Tree Kangaroo", "location": [-4.5690, 152.1550], "emoji": "🦘" },
  { "animal": "Black Rhinoceros", "location": [-3.7485, 38.6796], "emoji": "🦏" },
  { "animal": "Bald-headed Ibis", "location": [20.1397, 44.5828], "emoji": "🦩" },
  { "animal": "Axolotl", "location": [19.4326, -99.1332], "emoji": "🐸" },
  { "animal": "Indian Rhino", "location": [20.8937, 88.3207], "emoji": "🦏" },
  { "animal": "Sea Lion", "location": [-32.0049, -71.9441], "emoji": "🦭" },
  { "animal": "Savanna Elephant", "location": [-3.6968, 28.5632], "emoji": "🐘" },
  { "animal": "Hornbill", "location": [6.9271, 79.8612], "emoji": "🦅" },
  { "animal": "Long-tailed Macaque", "location": [13.4091, 103.9284], "emoji": "🐒" },
  { "animal": "Guanaco", "location": [-30.2809, -70.7777], "emoji": "🐐" },
  { "animal": "Golden Eagle", "location": [39.8848, -97.1613], "emoji": "🦅" },
  { "animal": "Swan", "location": [-36.1141, 149.7194], "emoji": "🦢" },
  { "animal": "Geoffroy’s Cat", "location": [-31.3073, -60.0656], "emoji": "🐱" },
  { "animal": "White Rhinoceros", "location": [-28.5283, 29.0895], "emoji": "🦏" },
  { "animal": "Lynx", "location": [55.2220, 12.7885], "emoji": "🐱" },
  { "animal": "Clownfish", "location": [-23.5350, 150.3580], "emoji": "🐠" },
  { "animal": "Platypus", "location": [-33.8651, 151.2093], "emoji": "🦡" },
  { "animal": "Wallaroo", "location": [-26.5142, 136.5947], "emoji": "🦘" },
  { "animal": "Pink Dolphin", "location": [-7.1109, -57.3811], "emoji": "🐬" },
  { "animal": "Peafowl", "location": [19.9014, 85.7989], "emoji": "🦚" },
  { "animal": "Saltwater Crocodile", "location": [-9.0802, 140.0287], "emoji": "🐊" },
  { "animal": "Giant Squid", "location": [48.5814, -72.2008], "emoji": "🐙" },
  { "animal": "Lesser Kestrel", "location": [42.6717, -7.8476], "emoji": "🦅" },
  { "animal": "Kakapo", "location": [-44.7579, 169.4467], "emoji": "🐦" },
  { "animal": "Brolga", "location": [-24.5284, 131.1648], "emoji": "🦩" },
  { "animal": "Prairie Dog", "location": [41.8670, -99.9018], "emoji": "🦔" },
  { "animal": "Bearded Vulture", "location": [41.1100, 19.7821], "emoji": "🦅" },
  { "animal": "Lamb", "location": [51.5074, -0.1278], "emoji": "🐑" }

  ]
  ;

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {/* Markers for each animal with emoji icon */}
        {wildlifeData.map((data, index) => (
          <Marker key={index} position={data.location} icon={new L.DivIcon({ 
            html: <div style="font-size: 30px">${data.emoji}</div> 
          })}>
            <Popup>{data.animal} Habitat</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;