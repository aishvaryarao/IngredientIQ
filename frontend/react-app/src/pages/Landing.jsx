import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const colors = {
    background: '#F4EDE3',
    surface: '#FBF8F3',
    espresso: '#3A2921',
    deepEspresso: '#291B16',
    muted: '#795F52',
    border: '#DCCFC2',
    accent: '#A88B78',
    soft: '#EDE1D4',
  };

  const features = [
    {
      title: 'AI-Powered Analysis',
      desc: 'Advanced ML models evaluate ingredient safety and potential risks.',
    },
    {
      title: 'Health Profiles',
      desc: 'Personalized insights based on allergies, sensitivities and more.',
    },
    {
      title: 'Safety Grades',
      desc: 'Understand product safety through a simple A–F grading system.',
    },
    {
      title: 'Detailed Insights',
      desc: 'See why individual ingredients may matter for your profile.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Enter Details',
      desc: 'Enter a barcode or ingredient list.',
    },
    {
      num: '02',
      title: 'AI Analysis',
      desc: 'Our models evaluate ingredients and potential risks.',
    },
    {
      num: '03',
      title: 'Get Insights',
      desc: 'Receive clear, personalized safety information.',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.background,
        color: colors.espresso,
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          padding: '24px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${colors.border}`,
          background: colors.surface,
        }}
      >
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.5px',
            color: colors.deepEspresso,
          }}
        >
          IngredientIQ
        </h1>

        <button
          onClick={() => navigate('/barcode')}
          style={{
            background: colors.espresso,
            color: colors.surface,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 40px 80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '7px 16px',
            marginBottom: '28px',
            borderRadius: '30px',
            background: colors.soft,
            color: colors.muted,
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.3px',
          }}
        >
          PRODUCT SAFETY INTELLIGENCE
        </div>

        <h2
          style={{
            fontSize: 'clamp(42px, 6vw, 68px)',
            fontWeight: 700,
            marginBottom: '26px',
            lineHeight: 1.08,
            letterSpacing: '-2px',
            color: colors.deepEspresso,
          }}
        >
          Know What's In
          <br />
          Your Products
        </h2>

        <p
          style={{
            fontSize: '19px',
            lineHeight: 1.7,
            margin: '0 auto 42px',
            color: colors.muted,
            maxWidth: '680px',
          }}
        >
          IngredientIQ uses AI to analyze product ingredients and provide
          personalized safety insights based on your health profile.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '90px',
          }}
        >
          <button
            onClick={() => navigate('/barcode')}
            style={{
              background: colors.espresso,
              color: colors.surface,
              border: `1px solid ${colors.espresso}`,
              padding: '15px 30px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(58, 41, 33, 0.14)',
            }}
          >
            Enter Barcode
          </button>

          <button
            onClick={() => navigate('/ingredient-checker')}
            style={{
              background: colors.surface,
              color: colors.espresso,
              border: `1px solid ${colors.espresso}`,
              padding: '15px 30px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Check Ingredients
          </button>
        </div>

        {/* Features */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
            textAlign: 'left',
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                background: colors.surface,
                padding: '30px',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                minHeight: '170px',
              }}
            >
              <h3
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: colors.espresso,
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: colors.muted,
                  margin: 0,
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        style={{
          background: colors.deepEspresso,
          color: colors.surface,
          padding: '90px 40px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '38px',
            fontWeight: 700,
            marginBottom: '14px',
          }}
        >
          How It Works
        </h2>

        <p
          style={{
            color: '#CDBDB2',
            fontSize: '16px',
            marginBottom: '60px',
          }}
        >
          Three simple steps to understand your products.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                flex: '1 1 250px',
                padding: '28px',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: '#C7AA96',
                  marginBottom: '18px',
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '9px',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#CDBDB2',
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section
        style={{
          padding: '90px 40px',
          textAlign: 'center',
          background: colors.background,
        }}
      >
        <h2
          style={{
            fontSize: '38px',
            fontWeight: 700,
            marginBottom: '18px',
            color: colors.deepEspresso,
          }}
        >
          Ready to understand your products?
        </h2>

        <p
          style={{
            color: colors.muted,
            fontSize: '16px',
            marginBottom: '32px',
          }}
        >
          Start with a barcode or enter your ingredients manually.
        </p>

        <button
          onClick={() => navigate('/barcode')}
          style={{
            background: colors.espresso,
            color: colors.surface,
            border: 'none',
            padding: '16px 36px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Enter Barcode
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: colors.deepEspresso,
          color: '#CDBDB2',
          padding: '28px 40px',
          textAlign: 'center',
          fontSize: '13px',
        }}
      >
        IngredientIQ © 2026 · AI-Powered Product Safety Intelligence
      </footer>
    </div>
  );
}