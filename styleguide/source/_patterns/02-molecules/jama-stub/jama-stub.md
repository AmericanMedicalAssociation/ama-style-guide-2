### Description
A single JAMA Article link.

### Use Case
Is used as part of a JAMA Component.

~~~
{
  style:
    type: string / required
  jamaStub: {
    subtitle:
      type: string / optional
    title: 
      type: string / required
    href: 
      type: string (url) / required
    src:
      type: string (url) / optional
    alt:
      type: string / optional
    heading: [
      level: 
        type: int "3"
      text: 
        type: string / required       
      class:
        type: string "ama__h3"
    ]      
  }
}
~~~
