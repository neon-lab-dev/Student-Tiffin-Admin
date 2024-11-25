

const Loader = () => {

  return (
          <div
              className='size-7'
              style={{
              '--c': 'radial-gradient(farthest-side, #ffffff 92%, transparent)',
              background: `
                  var(--c) 50% 0,
                  var(--c) 50% 100%,
                  var(--c) 100% 50%,
                  var(--c) 0 50%
              `,
              backgroundSize: '5px 5px',
              backgroundRepeat: 'no-repeat',
              animation: 'spinner-kh173p 1s infinite'
            }}
              >
              <style>
            {`
          @keyframes spinner-kh173p {
            to {
              transform: rotate(0.5turn);
              }
            }
            `}
              </style>
              </div>
              )
              ;
            };

export default Loader;
            