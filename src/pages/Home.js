import { collection, getDocs } from "firebase/firestore"
import { useContext } from "react"
import { useEffect, useState } from "react"
import ProjectList from "../components/ProjectList"
import { AuthContext } from "../context/AuthContext"
import { db } from "../firebase/config"
import ProjectFilter from "./ProjectFilter"

export default function Home() {
  const [documents, setDocuments] = useState([])
  const [currentFilter, setCurrentFilter] = useState("all");
  const [{user}] = useContext(AuthContext)


  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  
  useEffect(() => {
    const gettingTheDocs = async () => {
      const results = []
      const querySnapshot = await getDocs(collection(db, "projects"));
      querySnapshot.forEach((doc) => {
        let newO = {id: doc.id, ...doc.data()}
        results.push(newO)
      });
      setDocuments(results)
    }
    gettingTheDocs()
  }, [])


  const projectsToShow = documents.filter((p) => {
    switch (currentFilter) {
      case "all":
        return true
      case "mine":
        let assignedToUser = false;
        for (let i = 0; i < p.assignedUserList.length; i++) {
          if (user.uid === p.assignedUserList[i].id) {
            assignedToUser = true
            break
          }
        }
        return assignedToUser
      case "development":
      case "design":
      case "marketing":
      case "sales":
        return p.category === currentFilter
      default:
        return true
    }
  })

  return (
    <>
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      <ProjectList documents={projectsToShow} />
    </>
  )
}
