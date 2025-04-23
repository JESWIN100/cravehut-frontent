
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { Toaster } from 'sonner';
import { useState } from 'react';
function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <>
<div>
<RouterProvider router={router}/>
<Toaster
        position="bottom-center"
        theme="light"
        style={{
          '--toast-bg': '#e0f7fa',
          '--toast-text': '#004d40',
          '--toast-success': '#2e7d32',
          '--toast-error': '#c62828',
        }}
      />
</div>
    </>
  )
}

export default App
