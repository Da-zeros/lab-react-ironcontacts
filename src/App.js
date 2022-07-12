import logo from './logo.svg';
import './App.css';
import contactsData from'./contacts.json'
import { useState } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

function App() {

  const [contacts, setContacts] = useState(contactsData.slice(0,5))
  
  const getRandom = ()=>{
    let contactsDataLength = contactsData.length  
    let randomContact = Math.floor(Math.random() * (contactsDataLength - 0) + 0);
    const exist = contacts.find(contact =>{
      if(contact.id===contactsData[randomContact].id){
        return true
      }
      return false
    })
    console.log(exist)
    if(!exist){
      setContacts([...contacts,contactsData[randomContact]])
    }
  }

  const sortByName = () =>{
    //.sort muta la array entonces va dentro de un setContacts
    //[...contacts] creo una nueva array y sobre esa hago filter
    setContacts([...contacts].sort(function(a, b){
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
    }))
  }

  const sortByPopularity = () =>{
    setContacts([...contacts].sort(function(a, b){
      if (a.popularity > b.popularity) return -1
      if (a.popularity < b.popularity) return 1
      return 0
    }))
  }

  const deleteActor = (id) =>{
    console.log(id)
    const filterContacts = contacts.filter(contact => contact.id!==id)
    setContacts(filterContacts)
  }

  return (
    <div className="App">
      
      <h1>IronContacts</h1>
      <div className="butons">
        <button onClick={getRandom}>Add Random Contact</button>
        <button onClick={sortByName}>Sort by name</button>
        <button onClick={sortByPopularity}>Sort by popularity</button>
      </div>
      
      <table>
          <thead>
            <tr>
              <td>Picture</td>
              <td>Name</td>
              <td>Popularity</td>
              <td>Won and Oscar</td>
              <td>Won and Emmy</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
          {contacts.map((contact)=>{
           
            return(
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} alt="" /></td>
              <td>{contact.name}</td>
              <td className="popu">{contact.popularity}</td>
              <td>{contact.wonOscar&&<EmojiEventsIcon />}</td>
              <td>{contact.wonEmmy&&<StarIcon />}</td>
              <td><button onClick={()=>{deleteActor(contact.id)}}>Delete</button></td>
            </tr>
          )
          })}
          </tbody>
      </table>
    </div>
  );
}

export default App;
