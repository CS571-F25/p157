
export default function AboutMe({ isDarkMode })
{
    return <div style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547' }}>
        <img src={"https://pbs.twimg.com/profile_images/1852330841319280640/6D8HxYmd_400x400.jpg"} alt="Smiling doge" />
        <p>Martin Diges, the author of this page, is quite forgetful and likes to know where their things are.</p>
        <p>This website was produed in large part through interaction with Cursor. Uses React Router for navigation and React Bootstrap for styling.</p>
    </div> 
}