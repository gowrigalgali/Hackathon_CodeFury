import React from 'react';
import hurrincaneImg from './hurrincaneImg.jpeg';

const HurricaneDetails = () => {
  const tips = {
    'Hurricane': `1. **Prepare Your Home:** Secure windows and doors with shutters or plywood. Check your roof and ensure it is in good condition. Create a barrier with sandbags to prevent water from entering your home.\n\n2. **Develop an Evacuation Plan:** Identify evacuation routes and shelters. Have a plan for your pets and make arrangements for their safety as well.\n\n3. **Assemble an Emergency Kit:** Include essentials like water, non-perishable food, medications, a flashlight, batteries, and important documents. Keep important items in a waterproof container.`
  };

  return (
    <div>
      <h2>Hurricane</h2>
      <div id="preparationInfo">
        <div>
          <img src={hurrincaneImg} alt="Hurricane" />
          <p>Learn how to protect yourself and your family during a hurricane, including safety tips and emergency preparedness plans.</p>
          <div dangerouslySetInnerHTML={{ __html: tips['Hurricane'].replace(/\n/g, '<br/>') }} />
        </div>
      </div>
    </div>
  );
};

export default HurricaneDetails;



