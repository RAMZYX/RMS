import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './screens/LoginScreen';
import { MiqaatListScreen } from './screens/MiqaatListScreen';
import { RegistrationDetailScreen } from './screens/RegistrationDetailScreen';
import { AddPeopleScreen } from './screens/AddPeopleScreen';
import { ReviewScreen } from './screens/ReviewScreen';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/miqaats" element={<MiqaatListScreen />} />
        <Route path="/detail" element={<RegistrationDetailScreen />} />
        <Route path="/add-people" element={<AddPeopleScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
