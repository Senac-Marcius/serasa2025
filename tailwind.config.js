/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors:{
          primary:{
            20:'#E9D4F9',
            40:'#CDA3ED',
            60:'#B97AEA',
            80:'#A551E6',
            100:'#9128E2',
          },
          gray:{
            100:'#F5F5F5',
            200:'#E0E0E0',
            300:'#999999',
            400:'#666666',
            500:'#1A1A1A',
          }
         
        }
      },
    },
    plugins: [],
  }