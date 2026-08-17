import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { ThemeContext } from '../context/ThemeContext'; 



export default function Login() {
  const { login } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext); // 2. EXTRACT THE CURRENT THEME STATE
  

  const validationRules = {
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 }
  };

  const { values, errors, handleChange, validate } = useForm(
    { email: '', password: '' },
    validationRules
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login();
    }
  };

    return (
    <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border transition-all mt-8
      ${isDarkMode 
        ? "bg-[#151622] border-[#26283c]" 
        : "bg-white border-purple-100"}`}  
    >
      <div className="text-center mb-8">
        {/* Title shifts between pure white and near-black */}
        <h2 className={`text-3xl font-black tracking-tight uppercase 
          ${isDarkMode ? 'text-white' : 'text-purple-950'}`}
        >
          Level Up <span className="text-purple-500">Next</span>
        </h2>
        {/* Subheading text visibility fix */}
        <p className={`text-xs font-semibold uppercase tracking-widest mt-2 
          ${isDarkMode ? 'text-purple-300/50' : 'text-purple-600'}`}
        >
          Your portal to backend engineering
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="EMAIL SPACE"
          type="email"
          name="email"
          placeholder="you@domain.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="SECRET ACCESS"
          type="password"
          name="password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center justify-between mb-8 text-xs font-bold uppercase tracking-wider">
          {/* Label text visibility fix */}
          <label className={`flex items-center cursor-pointer select-none 
            ${isDarkMode ? 'text-purple-300/70' : 'text-purple-700'}`}
          >
            <input type="checkbox" className="rounded mr-2 border-purple-300 bg-transparent accent-purple-500" />
            Keep me inside
          </label>
          <a href="#" className="text-purple-600 hover:text-purple-500 transition-colors">
            Forgot Key?
          </a>
        </div>

        <Button variant="primary" type="submit" className="w-full py-3.5 text-xs font-black uppercase tracking-wides bg-purple-500 hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300" color="text">
          SIGN IN
        </Button>
      </form>

      {/* Footer text visibility fix */}
      <div className={`mt-6 text-center text-xs font-bold uppercase tracking-wider 
        ${isDarkMode ? 'text-purple-300/40' : 'text-purple-700/50'}`}
      >
        New candidate?{' '}
        <a href="#" className="text-indigo-600 dark:text-purple-400 hover:underline">
          Create Account
        </a>
      </div>
    </div>
  );
  

}
