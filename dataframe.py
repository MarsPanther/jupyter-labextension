import pandas as pd
from itables import to_html_datatable, options

# Set some options
options.lengthMenu = [2, 5, 10, 20]  # Display options for number of rows per page
options.classes = ["display", "nowrap"]  # Add CSS classes for table styling



def in_ipython_environment():
    """Checks if we are in an IPython environment (like Jupyter Notebook)."""
    try:
        from IPython import get_ipython
        return 'IPKernelApp' in get_ipython().config
    except:
        return False


def _render_monkey_patch():
    """Monkeypatches pd.DataFrame._repr_html_ for interactive display in IPython."""

    original_repr_html = pd.DataFrame._repr_html_

    def interactive_repr_html(self):
        # Check if the DataFrame has the 'interactive' attribute set to True
        if getattr(self, 'interactive', False):
            # Generate the HTML for the table using to_html_datatable
            table_html = to_html_datatable(self)

            # Retrieve header and footer HTML if they exist
            header_html = self.attrs.get("header_html", "")
            footer_html = self.attrs.get("footer_html", "")

            # Combine header, table, and footer
            combined_html = f"{header_html}{table_html}{footer_html}"
            return combined_html
        else:
            # Fallback to the original _repr_html_ method
            return original_repr_html(self)

    # Monkeypatch the _repr_html_ method
    pd.DataFrame._repr_html_ = interactive_repr_html


if in_ipython_environment():
    # Set the 'interactive' attribute to True for all DataFrames only in IPython env
    pd.DataFrame.interactive = True  # Use attrs dictionary

    _render_monkey_patch()


df = pd.DataFrame(
      {
          "Name": [
              "Braund, Mr. Owen Harris",
              "Allen, Mr. William Henry",
              "Bonnell, Miss. Elizabeth",
          ],
          "Age": [22, 35, 58],
          "Sex": ["male", "male", "female"],
      }
  )
  
df.attrs['header_html'] = '<h1> Heading Title </h1>'
df.attrs['footer_html'] = '<p> Footer text </p>'

df.head()

