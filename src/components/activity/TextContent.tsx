import React from 'react'
import {TextActivity} from 'src/types'
import Section from 'src/components/layout/Section'

const TextContent: React.FC<{activity: TextActivity}> = ({activity}) => (
  <Section title={activity.title}>{activity.text}</Section>
)

export default TextContent
