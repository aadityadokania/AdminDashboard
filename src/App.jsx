import { useState } from 'react'
import styles from './app.module.css'
import DataTable from './DataTable'

function App() {

  return (
    <>
     <div className={styles.container}>
        <DataTable/>
      </div>
    </>
  )
}

export default App
