const date = new Date()
const yearNumber = date.getFullYear()
const monthString = date.toLocaleString('en-US', { month: 'short' })
const branchName = `monthly-report_${monthString}_${yearNumber}`
if (branchName.length !== 23) Deno.exit(1)

const cmd = new Deno.Command('git', {
  args: ['switch', '-c', branchName]
})

const { code, stdout, stderr } = await cmd.output()

if (code === 0) {
  console.log('success')
  console.log(stdout)
  console.log(new TextDecoder().decode(stdout))
} else {
  console.log('fail')
  console.log(new TextDecoder().decode(stderr))
}
