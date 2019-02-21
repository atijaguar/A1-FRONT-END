export function prefix(location, ...prefixes) {
  return prefixes.some(
    prefix => (
      location.href.indexOf(`${location.origin}/${prefix}`) !== -1
    )
  )
}

export function desktop(location) {
  return true
}

export function grid(location) {
  return prefix(location, 'grid')
}

export function report(location) {
  return prefix(location, 'report')
}
