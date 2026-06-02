import { useBuilds } from '@hooks/useBuilds'
import type { DbdRole } from '@appTypes/DbdRole'
import type { BuildsData } from '@appTypes/Builds'
import { BuildPanel } from './BuildPanel'

interface BuildPanelsProps {
  role: DbdRole
}

export const BuildPanels = ({ role: dbdRole }: BuildPanelsProps) => {
  const { data: builds, isLoading } = useBuilds()
  if (isLoading || !builds) return <div>Loading...</div>

  const role = dbdRole.toLowerCase() as keyof BuildsData;
  if (!builds[role]) return <h1>{role} DOES NOT EXIST!</h1>

  const charactersArray = Object.entries(builds[role])

  return (
    charactersArray.map(([characterName, characterBuilds]) => (
      <BuildPanel key={characterName} characterName={characterName} builds={characterBuilds} />
    ))
  )
}