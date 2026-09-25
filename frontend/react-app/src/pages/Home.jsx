import { useNavigate } from 'react-router-dom';
import GradeBadge from '../components/GradeBadge';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Barcode Entry',
      description: 'Enter a product barcode to retrieve and analyze its ingredients',
    },
    {
      title: 'Ingredient Analysis',
      description: 'Analyze ingredient lists and understand their safety information',
    },
    {
      title: 'Manual Entry',
      description: 'Paste or type ingredients manually for a detailed analysis',
    },
  ];

  const exampleProducts = [
    {
      barcode: '5010724154018',
      name: 'Example Foundation',
      grade: 'C',
      concerns: 5,
    },
    {
      barcode: '8718951320065',
      name: 'Example Moisturizer',
      grade: 'B',
      concerns: 2,
    },
    {
      barcode: '3614270406127',
      name: 'Example Serum',
      grade: 'A',
      concerns: 0,
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Enter',
      description: 'Enter a barcode or provide an ingredient list',
    },
    {
      number: '02',
      title: 'Extract',
      description: 'Ingredients are extracted and normalized',
    },
    {
      number: '03',
      title: 'Analyze',
      description: 'The ML model evaluates ingredient safety',
    },
    {
      number: '04',
      title: 'Personalize',
      description: 'Get warnings based on your selected health profile',
    },
  ];

  return (
    <main
      style={{
        backgroundColor: '#f4ede3',
        color: '#3a2921',
        minHeight: 'calc(100vh - 64px)',
        paddingBottom: '80px',
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: '#3a2921',
          color: '#fbf8f3',
          padding: '90px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '3px',
              marginBottom: '20px',
              color: '#c9b29f',
            }}
          >
            PRODUCT SAFETY INTELLIGENCE
          </p>

          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-1.5px',
            }}
          >
            Understand What's
            <br />
            In Your Products
          </h1>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: '#d8c9bc',
              maxWidth: '650px',
              margin: '0 auto 36px',
            }}
          >
            Enter a product barcode or ingredient list and get clear,
            personalized safety insights in seconds.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => navigate('/barcode')}
              style={{
                backgroundColor: '#fbf8f3',
                color: '#3a2921',
                padding: '14px 30px',
                borderRadius: '9px',
                border: 'none',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ede1d4';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fbf8f3';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Enter Barcode
            </button>

            <button
              onClick={() => navigate('/ingredient-checker')}
              style={{
                backgroundColor: 'transparent',
                color: '#fbf8f3',
                padding: '13px 30px',
                borderRadius: '9px',
                border: '1px solid #c9b29f',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4a352b';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Check Ingredients
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#8d7568',
              marginBottom: '12px',
            }}
          >
            WHAT YOU CAN DO
          </p>

          <h2
            style={{
              fontSize: '34px',
              fontWeight: 700,
              margin: 0,
              color: '#3a2921',
            }}
          >
            Simple. Clear. Personalized.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#fbf8f3',
                border: '1px solid #dccfc2',
                borderRadius: '14px',
                padding: '30px',
                minHeight: '180px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 10px 25px rgba(58, 41, 33, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#ede1d4',
                  color: '#3a2921',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '22px',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </div>

              <h3
                style={{
                  fontSize: '19px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  color: '#3a2921',
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: '#795f52',
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section
        style={{
          backgroundColor: '#291b16',
          color: '#fbf8f3',
          padding: '80px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '56px',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                color: '#bda797',
                marginBottom: '12px',
              }}
            >
              HOW IT WORKS
            </p>

            <h2
              style={{
                fontSize: '34px',
                fontWeight: 700,
                margin: 0,
              }}
            >
              From Input to Insight
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '36px',
            }}
          >
            {steps.map((step) => (
              <div
                key={step.number}
                style={{
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: '#bda797',
                    marginBottom: '18px',
                  }}
                >
                  {step.number}
                </div>

                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '10px',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: '#c9bdb5',
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Products */}
      <section
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#8d7568',
              marginBottom: '12px',
            }}
          >
            EXPLORE
          </p>

          <h2
            style={{
              fontSize: '34px',
              fontWeight: 700,
              margin: 0,
              color: '#3a2921',
            }}
          >
            Try These Examples
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {exampleProducts.map((product, idx) => (
            <div
              key={idx}
              onClick={() =>
                navigate(`/barcode?barcode=${product.barcode}`)
              }
              style={{
                backgroundColor: '#fbf8f3',
                border: '1px solid #dccfc2',
                borderRadius: '14px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 10px 25px rgba(58, 41, 33, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '18px',
                }}
              >
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    margin: 0,
                    color: '#3a2921',
                  }}
                >
                  {product.name}
                </h3>

                <GradeBadge grade={product.grade} size="md" />
              </div>

              <p
                style={{
                  fontSize: '13px',
                  color: '#795f52',
                  marginBottom: '14px',
                }}
              >
                Barcode:{' '}
                <code
                  style={{
                    backgroundColor: '#ede1d4',
                    color: '#3a2921',
                    padding: '4px 7px',
                    borderRadius: '5px',
                  }}
                >
                  {product.barcode}
                </code>
              </p>

              <p
                style={{
                  fontSize: '13px',
                  color: '#795f52',
                  margin: 0,
                }}
              >
                {product.concerns} concern
                {product.concerns !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: '#ede1d4',
          padding: '80px 24px',
          textAlign: 'center',
          borderTop: '1px solid #dccfc2',
        }}
      >
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#8d7568',
              marginBottom: '14px',
            }}
          >
            START ANALYZING
          </p>

          <h2
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#3a2921',
              marginBottom: '16px',
            }}
          >
            Know What's In Your Products
          </h2>

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: '#795f52',
              marginBottom: '30px',
            }}
          >
            Enter a barcode or check an ingredient list to get your
            personalized safety analysis.
          </p>

          <button
            onClick={() => navigate('/barcode')}
            style={{
              backgroundColor: '#3a2921',
              color: '#fbf8f3',
              padding: '14px 34px',
              borderRadius: '9px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#291b16';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3a2921';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Enter Barcode
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;