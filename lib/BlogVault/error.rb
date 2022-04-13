module BlogVault
	class NotFoundError < StandardError
	  def initialize(params)
		@params = params
	  end
  
	  def message
		"No #{@params} found"
	  end
	end
  
	class MissingParamsError < StandardError
	  def initialize(params)
		@params = params
	  end
  
	  def message
		"You have not sent the following required fields: #{@params.join(',')}"
	  end
	end
  
	class ServerError < StandardError
	  def message
		"Server Issue, Please Try Again..."
	  end
	end
  
	class NullValueError < StandardError
	  def initialize(params) 
		@params = params
	  end
  
	  def message
		"#{@params} passed is null."
	  end
	end
  
	class InvalidRequestError < StandardError
	  def initialize(params) 
		@params = params
	  end
  
	  def message
		"Invlid #{@params} format"
	  end
	end
end
  
