import React, { useState } from 'react';
import FloodImg from './FloodImg.jpeg';

const FloodDetails = () => {
  const tips = {
    'Flood': `1. **Know Your Risk:** Understand whether you live in a flood-prone area by checking flood maps and local advisories. Stay informed about weather conditions and potential flood risks.\n\n2. **Create an Evacuation Plan:** Plan and practice evacuation routes that lead to higher ground. Ensure all family members are aware of the plan and have a safe place to go.\n\n3. **Prepare an Emergency Kit:** Assemble an emergency kit with items such as water, food, medications, important documents, and a battery-powered radio. Elevate electrical appliances and utilities above potential flood levels to reduce damage.`,
  };

  return (
    <div>
      <h2>Flood</h2>
      <div id="preparationInfo">
        <div>
          <img src={FloodImg} alt="Flood" />
          <p>Learn how to protect yourself and your family during a flood, including safety tips and emergency preparedness plans.</p>
          <div dangerouslySetInnerHTML={{ __html: tips['Flood'].replace(/\n/g, '<br/>') }} />
        </div>
      </div>
    </div>
  );
};

export default FloodDetails;


