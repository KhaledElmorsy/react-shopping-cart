function Home() {

  let style = {display: 'flex', flexDirection: 'column', alignItems:'center', gap: '30px', marginTop: '20px'}

  return (
    <div style={style}>
      <h1>Welcome!</h1>
      <h1>This is a sandwich shop built with React</h1>
      <h2>In our shop, you do what you want, nothing is imperative</h2>
      <h2>
        Just route your way to our products page and get yourself something nice
      </h2>
    </div>
  );
}

export default Home
