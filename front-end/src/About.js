import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'
import loadingIcon from './loading.gif'

/**
 * A React component that represents the About Us page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const About = props => {
  const [aboutData, setAboutData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * Fetches about data
   */
  const fetchAboutData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const data = response.data
        setAboutData(data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch about data once
    fetchAboutData()
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Me</h1>

      {error && <p className="About-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}
      {loaded && aboutData && (
        <>
          <img src={aboutData.imageUrl} alt="Profile" />
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default About
