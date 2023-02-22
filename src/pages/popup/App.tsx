import {
  buttonStyles,
  containerStyles,
  errorMessageStyles,
  headerStyles,
  headingStyles,
  inputStyles,
  mainStyles,
  paragraphStyles,
  successMessageStyles,
} from './styles'
import React, { useEffect, useRef } from 'react'

const App = (): JSX.Element => {
  const [currentPage, setCurrentPage] = React.useState<number | undefined>(
    undefined,
  )
  const [pageNumber, setPageNumber] = React.useState<string>('')
  const [success, setSuccess] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  const savePageNumber = () => {
    setError('')

    if (!pageNumber.length) {
      setError('Please enter the page number.')
      inputRef.current?.focus()
      return
    }

    if (Number(pageNumber) === 0) {
      setError(`You can't be on page ${pageNumber}.`)
      inputRef.current?.focus()
      return
    }

    setError('')

    localStorage.setItem('page-number', JSON.stringify(Number(pageNumber)))

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
  }

  useEffect(() => {
    const pageNumber = localStorage.getItem('page-number')
    if (pageNumber) {
      setPageNumber(pageNumber)
      setCurrentPage(Number(pageNumber))
    }
  }, [])

  return (
    <div style={containerStyles}>
      <header style={headerStyles}>
        <h1 style={headingStyles}>bookmark extension</h1>
        <p style={paragraphStyles}>Save the page number on this site.</p>
        {currentPage && (
          <p style={paragraphStyles}>
            You are currently on page <b>{currentPage}</b>.
          </p>
        )}
      </header>
      <main style={mainStyles}>
        <input
          ref={inputRef}
          type="number"
          value={pageNumber}
          min={1}
          style={inputStyles}
          onChange={(e) => {
            if (e.target.value) {
              setError('')
            }
            setPageNumber(e.target.value)
          }}
          placeholder="The current page number..."
          required
        />
        <div style={{ marginLeft: '15px' }}>
          <button type="button" style={buttonStyles} onClick={savePageNumber}>
            Save
          </button>
        </div>
      </main>
      {error && <p style={errorMessageStyles}>{error && error}</p>}
      {success && (
        <p style={successMessageStyles}>
          {`Saved page number ${Number(pageNumber)}`}.
        </p>
      )}
    </div>
  )
}

export default App
